/* Japanese copy for the standalone payment success page. */
(function () {
  window.WISTERIA_I18N_DICTIONARIES = window.WISTERIA_I18N_DICTIONARIES || {};
  window.WISTERIA_I18N_DICTIONARIES.ja = {
    "pages": {
      "payment-success": {
        "title": "お支払いが完了しました",
        "description": "お支払いが完了しました。OutlineSave のライセンスを有効化してください。"
      },
      "payment-success.html": {
        "title": "お支払いが完了しました",
        "description": "お支払いが完了しました。OutlineSave のライセンスを有効化してください。"
      }
    },
    "content": {
      "payment_success": {
        "languageLabel": "言語",
        "codeTitle": "アクティベーションコード",
        "codeSubtitle": "このコードをコピーして、OutlineSave でライセンスを有効化してください。",
        "copy": "コードをコピー",
        "keepCode": "コードは大切に保管してください。決済時に入力したメールアドレスにも控えをお送りします。",
        "refresh": "このページを再読み込み",
        "stepsTitle": "3 ステップで有効化",
        "step1": "アクティベーションコードをコピー",
        "step1Detail": "このページまたはライセンスメールからコピーしてください。",
        "step2": "OutlineSave を開いて「有効化」をクリック",
        "step2Detail": "ブラウザーのツールバーにある OutlineSave アイコンをクリックし、ポップアップ上部の「Activate」を選択します。",
        "step3": "コードを貼り付けて「有効化」をクリック",
        "step3Detail": "コード欄は自動で開きます。ChatGPT や会話を開く必要はありません。",
        "emailTitle": "メールが届いていませんか？",
        "emailHelp": "決済に使用したメールアドレスの迷惑メールフォルダーをご確認ください。まだ届いていない場合は、しばらくしてからページを再読み込みし、ボタンが使えるようになったら再送してください。",
        "resendLimit": "再送可能時間：30 分以内 · 最大 2 回",
        "support": "お支払いから 30 分経ってもコードが届かない場合は、こちらまでご連絡ください",
        "noScript": "JavaScript を有効にしてコードを取得するか、ライセンスメールをご確認ください。"
      }
    },
    "runtime": {
      "paymentSuccess": {
        "codeSubtitle": "このコードをコピーして、OutlineSave でライセンスを有効化してください。",
        "waitingSubtitle": "下のステータスを確認し、ライセンスメールをご確認ください。",
        "checking": "ライセンスを確認中",
        "paymentSuccess": "お支払いが完了しました",
        "waitingConfirmation": "お支払いの確認を待っています",
        "processing": "お支払いが確認されると、アクティベーションコードが表示されます。",
        "gratitude": "OutlineSave をご購入いただき、ありがとうございます。",
        "quarterly_subscriptionPlan": "PRO 3 か月サブスクリプション",
        "annual_subscriptionPlan": "PRO 年間サブスクリプション",
        "quarterly_subscriptionTerms": "サブスクリプション · 3 か月ごとに自動更新 · 更新はいつでも停止可能",
        "annual_subscriptionTerms": "サブスクリプション · 毎年自動更新 · 更新はいつでも停止可能",
        "quarterly_subscriptionActivated": "有効化は一度だけです。更新時も同じコードを使用し、支払い済み期間の終了まで Pro を利用できます。",
        "annual_subscriptionActivated": "有効化は一度だけです。更新時も同じコードを使用し、支払い済み期間の終了まで Pro を利用できます。",
        "subscriptionManageHelp": "更新を停止するには、拡張機能のアバター → PRO ステータス →「サブスクリプションの管理」を開き、Paddle のページで更新停止を確認してください。Paddle の領収書メールにある請求リンクも利用できます。支払い済み期間は Pro を利用できます。",
        "genericPlan": "OutlineSave ライセンス",
        "annualPlan": "PRO 1 年ライセンス",
        "lifetimePlan": "PRO 永続ライセンス",
        "genericTerms": "ライセンス条件は注文確認に記載されています。",
        "annualTerms": "一回払い · 有効期間 1 年 · 自動更新なし",
        "lifetimeTerms": "一回払い · 有効期限なし · 自動更新なし",
        "genericActivated": "有効化後、メンバーシップのステータスからライセンスの詳細をご確認ください。",
        "annualActivated": "有効化後、ステータスに「PRO 1 年」と表示されます。期限も確認できます。",
        "lifetimeActivated": "有効化後、ステータスに有効期限なしの「PRO 永続」と表示されます。",
        "waitingCode": "アクティベーションコードを準備しています。",
        "refreshHelp": "コードは決済時に使用したメールアドレスに送信されます。しばらくしてからこのページを再読み込みしてください。",
        "checkEmailTitle": "決済時に入力したメールアドレスをご確認ください",
        "checkEmail": "決済後の戻りリンクを開くと、ここでコードを取得できます。ライセンスメールに記載されたコードも使えます。",
        "sessionExpiredTitle": "このリンクの有効期限が切れました",
        "sessionExpiredDetail": "再読み込みしても有効期限は延長されません。メールに記載されたコードをご利用ください。メールが届いていない場合はサポートまでご連絡ください。",
        "invalidSession": "このリンクは無効です。ライセンスメールをご確認いただくか、サポートまでご連絡ください。",
        "copySuccess": "アクティベーションコードをコピーしました。",
        "copyFailed": "コピーできませんでした。コードを選択して手動でコピーしてください。",
        "resendButton": "アクティベーションメールを再送",
        "resendWaiting": "コードの準備ができると再送できます",
        "resendCountdown": "再送（{seconds} 秒）",
        "sending": "送信中…",
        "emailSentRemaining": "メールを送信しました。あと {count} 回再送できます。",
        "maximumResendReached": "再送回数の上限に達しました。受信トレイや迷惑メールを確認するか、サポートまでご連絡ください。",
        "sessionExpiredInbox": "このリンクの有効期限が切れました。メールをご確認いただくか、サポートまでご連絡ください。",
        "failed": "メールを送信できませんでした。しばらくしてからもう一度お試しください。",
        "networkError": "ネットワークエラーが発生しました。しばらくしてからもう一度お試しください。"
      }
    }
  };
})();
