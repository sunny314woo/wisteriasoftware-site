/* Runtime messages for pricing and the local mock dialog. */
(() => {
  window.OutlineSavePricingMessages = {
    en: { save: 'Save {amount}', ends: 'Ends {date}', timer: 'Time remaining',
      campaign: 'Lifetime · {days}-day early bird offer', difference: 'Only {amount} more than 1-Year Pro',
      error: 'Checkout is not available. Please try again later.',
      priceError: 'Current prices could not be loaded. Please refresh to try again.',
      mockTitle: 'Simulate checkout', mockNote: 'Local test only. No payment is taken and no real license or email is created.',
      annual: 'Pro · 1 Year', lifetime: 'Pro · Lifetime', total: 'Total', discount: 'Discount',
      complete: 'Simulate successful payment', cancel: 'Cancel',
      changed: 'This offer has ended or changed. The total has been updated; please review it before continuing.',
      configured: 'Checkout configuration is incomplete. This preview cannot take payments.' },
    'zh-Hans': { save: '立省 {amount}', ends: '截止 {date}', timer: '优惠剩余时间',
      campaign: '终身版 · 限时 {days} 天早鸟优惠', difference: '只比一年版多 {amount}',
      error: '暂时无法结账，请稍后重试。',
      priceError: '暂时无法获取当前价格，请刷新页面后重试。',
      mockTitle: '模拟结账', mockNote: '仅供本地测试，不扣款，不生成真实许可证，也不发送邮件。',
      annual: 'Pro · 一年版', lifetime: 'Pro · 终身版', total: '合计', discount: '优惠',
      complete: '模拟支付成功', cancel: '取消',
      changed: '优惠已结束或发生变化，价格已更新，请确认后再继续。',
      configured: '支付配置尚未完成，此预览不能进行真实付款。' },
  };
})();
