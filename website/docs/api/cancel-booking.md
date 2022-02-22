---
title: Cancel Booking
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/bookings/cancel" method="put">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Body

- **reference_no** (string, required) Booking Reference Number, 255 max length.
- **reason** (string, required) Cancellation reason, 255 max length.

#### Example request body:

```json
{
  "reference_no": "XXXXXXXX",
  "reason": "Change of mind"
}
```

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully cancelled booking"
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

#### Status Code: 400

```json
{
  "success": false,
  "message": "Reason is required"
}
```

```json
{
  "success": false,
  "message": "Booking is already PICKUP COMPLETE" // can only cancel if booking is either CONFIRMED, ACCEPTED, or OUT FOR PICKUP
}
```

</ApiEndpoint>
