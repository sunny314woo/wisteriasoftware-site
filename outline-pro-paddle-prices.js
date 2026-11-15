/* Validate read-only Paddle price previews before using them in the sales UI. */
((root) => {
  const amount = value => {
    if (typeof value !== 'string' || !/^\d+$/.test(value)) throw new Error('Invalid Paddle amount');
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw new Error('Invalid Paddle amount');
    return number;
  };
  function line(result, id, interval = null, frequency = null) {
    if (result?.data?.currencyCode !== 'USD') throw new Error('Unexpected preview currency');
    const item = result.data.details?.lineItems?.find(item => item.price?.id === id);
    if (!item || item.quantity !== 1 || item.price.status !== 'active'
      || (interval === null ? item.price.billingCycle !== null
        : item.price.billingCycle?.interval !== interval || item.price.billingCycle?.frequency !== frequency)
      || item.price.unitPrice?.currencyCode !== 'USD') {
      throw new Error('Unexpected Paddle price');
    }
    const total = amount(item.unitTotals?.total);
    if (total <= 0) throw new Error('Invalid Paddle price');
    return { total, discount: amount(item.unitTotals.discount) };
  }
  function normalize(config, regular, discounted, campaignActive) {
    const quarterly = line(regular, config.quarterly.priceId, 'month', 3);
    const annual = line(regular, config.annual.priceId, 'year', 1);
    // Retired one-year sales need no preview request. Keep their amount for
    // legacy receipts and simulations, while validating every current sale price.
    const annualOneTime = !Array.isArray(config.salePlans) || config.salePlans.includes('annualOneTime')
      ? line(regular, config.annualOneTime.priceId) : { total: config.annualOneTime.amount, discount: 0 };
    if (Array.isArray(config.salePlans) && !config.salePlans.includes('lifetime')) {
      if (quarterly.discount || annual.discount || annualOneTime.discount) throw new Error('Unexpected subscription discount');
      return { quarterly: quarterly.total, annual: annual.total,
        annualOneTime: annualOneTime.total, regular: config.lifetime.amount, discount: 0 };
    }
    const lifetime = line(regular, config.lifetime.priceId);
    if (quarterly.discount || annual.discount || annualOneTime.discount || lifetime.discount) throw new Error('Unexpected base price discount');
    const offer = campaignActive ? line(discounted, config.lifetime.priceId) : lifetime;
    if (offer.total > lifetime.total || offer.discount !== lifetime.total - offer.total) {
      throw new Error('Inconsistent Paddle discount');
    }
    return { quarterly: quarterly.total, annual: annual.total, annualOneTime: annualOneTime.total, regular: lifetime.total, discount: lifetime.total - offer.total };
  }
  function campaignActive(config, now = Date.now()) {
    if (Array.isArray(config.salePlans) && !config.salePlans.includes('lifetime')) return false;
    if (config.campaign?.enabled !== true) return false;
    const dates = [config.campaign?.startsAt, config.campaign?.endsAt];
    if (!dates.every(date => typeof date === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(date))) return false;
    const [start, end] = dates.map(Date.parse);
    return Number.isFinite(start) && start < end && now >= start && now < end;
  }
  function requests(config, active) {
    const base = { currencyCode: 'USD', address: { countryCode: 'US' } };
    // Display USD reference prices. Actual tax/location is determined at checkout.
    const plans = config.salePlans || ['quarterly', 'annual', 'annualOneTime', 'lifetime'];
    const regular = { ...base, items: plans.map(plan => ({ priceId: config[plan].priceId, quantity: 1 })) };
    const discounted = active && plans.includes('lifetime') ? { ...base, items: [{ priceId: config.lifetime.priceId, quantity: 1 }], discountId: config.campaign.discountId } : null;
    if (active && !/^dsc_[a-z0-9]+$/.test(discounted.discountId || '')) throw new Error('Paddle preview requires a Discount ID');
    return { regular, discounted };
  }
  const api = { normalize, campaignActive, requests };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OutlineSavePaddlePrices = api;
})(globalThis);
