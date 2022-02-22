---
title: Retry Pairing
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/bookings/retry-pairing" method="put">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Body

- **reference_no** (string, required) Booking Reference Number, 255 max length.
- **customer_id_no** (string, required) Customer ID Number, 8-alphanumeric all-caps. Pattern: `^[A-Z0-9]{8}$`

#### Example request body:

```json
{
  "reference_no": "XXXXXXXX",
  "customer_id_no": "ABCD1234"
}
```

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully retried pairing",
  "data": {
    "status": "FINDING NEARBY" // if has nearby riders, ongoing pairing here
  }
}
```

```json
{
  "success": true,
  "message": "Successfully retried pairing",
  "data": {
    "status": "NO RIDER FOUND" // if has no nearby riders, no ongoing pairing here
  }
}
```

### Error

#### Status Code: 401

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

#### Status Code: 404

```json
{
  "success": false,
  "message": "Booking not found" // the provided reference_no and/or customer_id_no are/is invalid
}
```

#### Status Code: 400

```json
{
  "success": false,
  "message": "Cannot retry PICKUP COMPLETE booking" // can only retry if booking is CONFIRMED
}
```

```json
{
  "success": false,
  "message": "Rider pairing is ongoing" // cannot retry if rider pairing is ongoing
}
```

</ApiEndpoint>
