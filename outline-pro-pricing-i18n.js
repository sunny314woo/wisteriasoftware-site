/* Runtime messages for pricing and the local mock dialog. */
(() => {
  window.OutlineSavePricingMessages = {
    en: { close: 'Close', lifetimeRule: 'One-time payment · No auto-renewal', annualRule: 'Subscription · Auto-renews yearly. Cancel renewal anytime; access stays active until the paid period ends.', quarterlyRule: 'Subscription · Auto-renews every 3 months. Cancel renewal anytime; access stays active until the paid period ends.', save: 'Save {amount}', ends: 'Ends {date}', timer: 'Time remaining',
      monthly: 'About {monthly} / month',
      campaign: 'Lifetime · {days}-day early bird offer', difference: 'Only {amount} more than 1-Year Pro',
      error: 'Checkout is not available. Please try again later.',
      priceError: 'Current prices could not be loaded. Please refresh to try again.',
      mockTitle: 'Simulate checkout', mockNote: 'Local test only. No payment is taken and no real license or email is created.',
      annualOneTime: 'Pro · 1-Year license (one-time)', quarterly: 'Pro · Quarterly subscription', annual: 'Pro · Annual subscription', lifetime: 'Pro · Lifetime', total: 'Total', discount: 'Discount',
      complete: 'Simulate successful payment', cancel: 'Cancel',
      changed: 'This offer has ended or changed. The total has been updated; please review it before continuing.',
      configured: 'Checkout configuration is incomplete. This preview cannot take payments.' },
    'zh-Hans': { close: '关闭', lifetimeRule: '一次性付款 · 不自动续费', annualRule: '订阅 · 每年自动续费。可随时取消续费，当前付费周期内权益保留。', quarterlyRule: '订阅 · 每 3 个月自动续费。可随时取消续费，当前付费周期内权益保留。', save: '立省 {amount}', ends: '截止 {date}', timer: '优惠剩余时间',
      monthly: '平均每月约 {monthly}',
      campaign: '终身版 · 限时 {days} 天早鸟优惠', difference: '只比一年版多 {amount}',
      error: '暂时无法结账，请稍后重试。',
      priceError: '暂时无法获取当前价格，请刷新页面后重试。',
      mockTitle: '模拟结账', mockNote: '仅供本地测试，不扣款，不生成真实许可证，也不发送邮件。',
      annualOneTime: 'Pro · 一年授权（一次性付款）', quarterly: 'Pro · 季度订阅', annual: 'Pro · 年度订阅', lifetime: 'Pro · 终身版', total: '合计', discount: '优惠',
      complete: '模拟支付成功', cancel: '取消',
      changed: '优惠已结束或发生变化，价格已更新，请确认后再继续。',
      configured: '支付配置尚未完成，此预览不能进行真实付款。' },
  };
})();
