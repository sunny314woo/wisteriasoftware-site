/* Validate read-only Paddle price previews before using them in the sales UI. */
((root) => {
  const amount = value => {
    if (typeof value !== 'string' || !/^\d+$/.test(value)) throw new Error('Invalid Paddle amount');
    const number = Number(value);
    if (!Number.isSafeInteger(number)) throw new Error('Invalid Paddle amount');
    return number;
  };
  function line(result, id) {
    if (result?.data?.currencyCode !== 'USD') throw new Error('Unexpected preview currency');
    const item = result.data.details?.lineItems?.find(item => item.price?.id === id);
    if (!item || item.quantity !== 1 || item.price.status !== 'active'
      || item.price.billingCycle !== null || item.price.unitPrice?.currencyCode !== 'USD') {
      throw new Error('Unexpected Paddle price');
    }
    const total = amount(item.unitTotals?.total);
    if (total <= 0) throw new Error('Invalid Paddle price');
    return { total, discount: amount(item.unitTotals.discount) };
  }
  function normalize(config, regular, discounted, campaignActive) {
    const annual = line(regular, config.annual.priceId);
    const lifetime = line(regular, config.lifetime.priceId);
    if (annual.discount || lifetime.discount) throw new Error('Unexpected base price discount');
    const offer = campaignActive ? line(discounted, config.lifetime.priceId) : lifetime;
    if (offer.total > lifetime.total || offer.discount !== lifetime.total - offer.total) {
      throw new Error('Inconsistent Paddle discount');
    }
    return { annual: annual.total, regular: lifetime.total, discount: lifetime.total - offer.total };
  }
  function campaignActive(config, now = Date.now()) {
    const dates = [config.campaign?.startsAt, config.campaign?.endsAt];
    if (!dates.every(date => typeof date === 'string' && /(?:Z|[+-]\d{2}:\d{2})$/.test(date))) return false;
    const [start, end] = dates.map(Date.parse);
    return Number.isFinite(start) && start < end && now >= start && now < end;
  }
  function requests(config, active) {
    const base = { currencyCode: 'USD', address: { countryCode: 'US' } };
    // Display USD reference prices. Actual tax/location is determined at checkout.
    const regular = { ...base, items: [config.annual, config.lifetime].map(plan => ({ priceId: plan.priceId, quantity: 1 })) };
    const discounted = active ? { ...base, items: [{ priceId: config.lifetime.priceId, quantity: 1 }], discountId: config.campaign.discountId } : null;
    if (active && !/^dsc_[a-z0-9]+$/.test(discounted.discountId || '')) throw new Error('Paddle preview requires a Discount ID');
    return { regular, discounted };
  }
  const api = { normalize, campaignActive, requests };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.OutlineSavePaddlePrices = api;
})(globalThis);
