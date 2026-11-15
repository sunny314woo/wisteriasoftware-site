/* Pure pricing decisions, shared by the browser and Node tests. */
((root) => {
  const localHosts = ['localhost', '127.0.0.1', '[::1]', '::1'];
  const money = amount => '$' + (amount / 100).toFixed(2);
  const validAmount = amount => Number.isSafeInteger(amount) && amount > 0;
  function timestamp(value) {
    return typeof value === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(value) ? Date.parse(value) : NaN;
  }
  function snapshot(config, now = Date.now()) {
    const quarterly = config.quarterly?.amount;
    const annual = config.annual?.amount;
    const annualOneTime = config.annualOneTime?.amount;
    const regular = config.lifetime?.amount;
    if (![quarterly, annual, annualOneTime, regular].every(validAmount)) throw new Error('Invalid USD amounts');
    const campaign = config.campaign || {};
    const start = timestamp(campaign.startsAt), end = timestamp(campaign.endsAt);
    const discount = campaign.discountAmount;
    const active = campaign.enabled === true && Number.isFinite(now) && start < end && now >= start && now < end
      && validAmount(discount) && discount < regular;
    return { quarterly, annual, annualOneTime, regular, lifetime: active ? regular - discount : regular,
      discount: active ? discount : 0, active, start, end,
      remaining: active ? Math.max(0, Math.ceil((end - now) / 1000)) : 0 };
  }
  function isLocal(hostname) { return localHosts.includes(hostname) || !hostname; }
  function mode(config, hostname) {
    // Even an accidentally enabled live configuration cannot charge on localhost.
    if (isLocal(hostname)) return 'mock';
    if (config.mode === 'live' && config.enableLiveCheckout === true
      && ['wisteriasoftware.uk', 'www.wisteriasoftware.uk'].includes(hostname)) return 'live';
    return 'disabled';
  }
  function checkout(config, plan, now, settings) {
    if (!['quarterly', 'annual', 'annualOneTime', 'lifetime'].includes(plan)) throw new Error('Unknown plan');
    if (Array.isArray(config.salePlans) && !config.salePlans.includes(plan)) throw new Error('Plan is no longer offered');
    const state = snapshot(config, now);
    const options = { items: [{ priceId: config[plan].priceId, quantity: 1 }],
      settings: { ...settings, showAddDiscounts: true, allowDiscountRemoval: true } };
    if (plan === 'lifetime' && state.active) {
      const id = config.campaign.discountId;
      if (id && !id.startsWith('REPLACE_WITH_')) options.discountId = id;
      else if (config.campaign.discountCode) options.discountCode = config.campaign.discountCode;
      else options.discountId = id;
    }
    return options;
  }
  function validateLive(config, options) {
    if (!/^live_[a-zA-Z0-9]+$/.test(config.paddleClientToken || '')
      || !/^pri_[a-z0-9]+$/.test(options.items[0].priceId || '')
      || ('discountId' in options && !/^dsc_[a-z0-9]+$/.test(options.discountId || ''))
      || ('discountCode' in options && (typeof options.discountCode !== 'string'
        || !options.discountCode || options.discountCode.startsWith('REPLACE_WITH_')))) {
      throw new Error('Live checkout still has configuration placeholders');
    }
  }
  function billingSummary(config, plan, now = Date.now()) {
    const state = snapshot(config, now);
    if (!['quarterly', 'annual', 'annualOneTime', 'lifetime'].includes(plan)) throw new Error('Unknown plan');
    return { plan, amount: state[plan], currency: 'USD',
      type: ['quarterly', 'annual'].includes(plan) ? 'subscription' : 'one-time' };
  }
  const api = { money, snapshot, isLocal, mode, checkout, validateLive, billingSummary };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OutlineSavePricingModel = api;
})(globalThis);
