---
title: Rider Assignment Status
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/bookings/{reference_no}/rider-assignment-status" method="get">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Params

- **reference_no** (string, required) Booking Reference Number, 255 max length.

#### Example request url:

- `GET /api/bookings/10002067/rider-assignment-status`

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully retrieved rider assignment status",
  "data": {
    "status": "FINDING NEARBY" // if has nearby riders, ongoing pairing here, cannot retry pairing
  }
}
```

```json
{
  "success": true,
  "message": "Successfully retrieved rider assignment status",
  "data": {
    "status": "NO RIDER FOUND" // no nearby riders, no ongoing pairing here, can retry pairing
  }
}
```

```json
{
  "success": true,
  "message": "Successfully retrieved rider assignment status",
  "data": {
    "status": "ASSIGNED", // if a nearby rider accepts the booking assignment, no ongoing pairing here, cannot retry pairing
    "rider": {
      "full_name": "Jay Remollo",
      "contact_no": "9123456789",
      "plate_no": "ABC123"
    }
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
  "message": "Booking not found" // the provided reference_no is invalid
}
```

</ApiEndpoint>
