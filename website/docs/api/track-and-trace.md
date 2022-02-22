---
title: Track and Trace
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/bookings/{reference_no}/track" method="get">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Params

- **reference_no** (string, required) Booking Reference Number, 255 max length.

#### Example request url:

- `GET /api/bookings/10002067/track`

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully retrieved status history",
  "data": {
    "booking": {
      "booking_no": "220203-1E-0001", // LODI's booking number
      "remarks": "Jay Remollo (9123456789)", // contact number will only be present until booking is not yet COMPLETED
      "booking_history": [
        {
          "status": "COMPLETED",
          "reason": null, // reason will have a value if the status is either PENDING CANCELLATION or CANCELLED
          "created_at": "2022-02-04 01:24:04 PM"
        },
        {
          "status": "PICKUP COMPLETE",
          "reason": null,
          "created_at": "2022-02-04 01:23:34 PM"
        },
        {
          "status": "REACHED PICKUP",
          "reason": null,
          "created_at": "2022-02-04 01:23:19 PM"
        },
        {
          "status": "OUT FOR PICKUP",
          "reason": null,
          "created_at": "2022-02-04 01:23:14 PM"
        },
        {
          "status": "ACCEPTED",
          "reason": null,
          "created_at": "2022-02-04 01:23:07 PM"
        },
        {
          "status": "CONFIRMED",
          "reason": null,
          "created_at": "2022-02-04 01:22:41 PM"
        }
      ]
    },
    "deliveries": [
      {
        "order": 1,
        "delivery_history": [
          {
            "status": "DELIVERY COMPLETE",
            "reason": null, // will have a value if status is FAILED
            "created_at": "2022-02-04 01:24:03 PM"
          },
          {
            "status": "ARRIVED",
            "reason": null,
            "created_at": "2022-02-04 01:23:50 PM"
          },
          {
            "status": "OUT FOR DELIVERY",
            "reason": null,
            "created_at": "2022-02-04 01:23:44 PM"
          },
          {
            "status": "PENDING",
            "reason": null,
            "created_at": "2022-02-04 01:22:27 PM"
          }
        ]
      }
    ]
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
