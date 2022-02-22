---
title: Retrieve Vehicle Types
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/vehicle-types" method="get">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully retrieved vehicle types",
  "data": [
    {
      "id": "1ee18d43-5b38-45a9-9ef5-1ee3a17d90b9",
      "name": "Motorcycle",
      "max_weight": "20.00",
      "max_dimension": "50.00",
      "base_rate": "20.00",
      "base_distance": "1.00",
      "rule": "PERCENTAGE",
      "value": "20.00",
      "cancellation_fee": "15.00",
      "rts_fee": "0.00",
      "additional_drop_fee": "0.00"
    }
  ]
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

</ApiEndpoint>
