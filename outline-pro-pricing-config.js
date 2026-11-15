/* Release configuration. Live mode applies only on the official website; local hosts always simulate.
   An integrator can set window.OutlineSavePricingInput BEFORE this script.
   Amounts below are the verified release snapshot for immediate display and local
   simulation. Live display syncs from Paddle in the background; checkout uses IDs.
   All amounts are integer USD cents; ISO timestamps must include a timezone. */
(() => {
  const input = window.OutlineSavePricingInput || {};
  window.OutlineSavePricingConfig = {
    mode: 'live',
    enableLiveCheckout: true,
    freeDirectoryLimit: 100,
    freeExportWeeklyLimit: 3,
    salePlans: ['quarterly', 'annual', 'lifetime'],
    paddleClientToken: 'live_3d23a490eb6f34c96ae919a7b4c',
    ...input,
    quarterly: {
      amount: 1000,
      priceId: 'pri_01m74vhtdxefs3w61p1nzvpcd4',
      ...input.quarterly,
    },
    annual: {
      amount: 2499,
      priceId: 'pri_01m74vq83rxs0zkpvsnksmtz0s',
      ...input.annual,
    },
    annualOneTime: {
      amount: 2499,
      priceId: 'pri_01kqsj92jxydy135ep6cdex06f',
      ...input.annualOneTime,
    },
    lifetime: {
      amount: 4999,
      // Supplied by the owner and verified in the Paddle product UI, Oct 16.
      priceId: 'pri_01m4t0yykn0h1dcvzt97qsnzt2',
      ...input.lifetime,
    },
    campaign: {
      enabled: false,
      startsAt: '2026-10-16T00:00:00+08:00',
      endsAt: '2026-11-15T00:00:00+08:00',
      discountAmount: 1000,
      discountId: 'dsc_01kvwqx6yfm3ba3319109j6att',
      // Existing USD 10 discount, restricted to the lifetime price above.
      // A supplied Discount ID takes precedence over the code, never both.
      discountCode: '10discount',
      ...input.campaign,
    },
  };
})();
