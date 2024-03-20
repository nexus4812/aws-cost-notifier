# aws-cost-notifier

AWSの料金をdiscordに通知するシステム

## Usage

```bash

# 展開
npx serverless deploy 

# ローカルで実行
npx serverless invoke local -f awsCostNotifier

# 削除
npx serverless remove
```

## 構成

EventBridgeで毎日Lambdaを呼び出して実行しているだけ
DiscordのWebhookURLはSystemManagerParameterStoreで保持
