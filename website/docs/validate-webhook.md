---
title: Validate Webhook Notifications
---

## Securing a Webhook. Optional but highly recommended.

Your server can optionally validate the webhook notifications to confirm that the LODI server sends them.

All webhook notifications sent to your server contain the `x-lodi-signature` header. This header is an HMAC-SHA1 signature generated using your webhook request payload and your secret key. Your secret key will be provided to you by the LODI developer.

Please review the code examples below for guidance on performing signature verification.

:::info IMPORTANT

Please ensure to process raw body from the HTTP(s) POST request to validate the contents of the webhook payload.

:::

## NodeJS

```js
const crypto = require('crypto');

// Get webhook payload as received by your server endpoint. It needs to be the raw payload coming from the HTTP POST body that came to your server endpoint.
const webhook_payload =
  '{"booking_status":{"booking_no":"220203-1E-0001","reference_no":"XXXXXX","status":"PICKUP COMPLETE","status_timestamp":"2022-02-03 08:33:28 AM"},"delivery_status":{"order":1,"is_rts":false,"status":"OUT FOR DELIVERY","status_timestamp":"2022-02-03 08:33:28 AM"},"rider":{"full_name":"Jay Remollo","contact_no":"9123456789"}}';

// Get your secret key
const SECRET_KEY = '{your_secret_key}';

const signature = crypto
  .createHmac('sha1', SECRET_KEY)
  .update(webhook_payload)
  .digest('hex');

// Verify signature from `x-lodi-signature` header
const webhook_payload_signature = '{x-lodi-signature value}';

if (signature === webhook_payload_signature) {
  console.log('Verification is successful'); // webhook came from LODI server
} else {
  console.log('Verification failed'); // webhook came from somewhere else, not LODI server
}
```
