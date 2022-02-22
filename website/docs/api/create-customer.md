---
title: Create Customer
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/customers" method="post">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Body

- **first_name** (string, required) First name, 255 max length.
- **last_name** (string, required) Last name, 255 max length.
- **contact_no** (string, required) Contact number, 10-digit number, starts with 9. Pattern: `^9[0-9]{9}$`
- **email** (string, required) Email address. Format: `email`
- **address** (string, required) Address, 255 max length.

#### Example request body:

```json
{
  "first_name": "Joema",
  "last_name": "Nequinto",
  "contact_no": "9123456789",
  "email": "janequinto@codedisruptors.com",
  "address": "Code Disruptors, Inc. Kalaw Building Complex, National Hwy Los Baños, Laguna 4030"
}
```

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully created customer",
  "data": {
    "id": "5cdb25fa-1054-4f19-a42a-064e890b00e4", // generated id of the customer
    "customer_id_no": "ABCD1234", // generated 8 alphanumeric customer id number
    "first_name": "Joema",
    "last_name": "Nequinto",
    "contact_no": "9123456789",
    "email": "janequinto@codedisruptors.com",
    "address": "Code Disruptors, Inc. Kalaw Building Complex, National Hwy Los Baños, Laguna 4030",
    "customer_group_name": "GENERAL", // default customer group
    "system_integration_name": "LISA" // depends on client_id & secret_key from authorization
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

#### Status Code: 400

```json
{
  "success": false,
  "message": "Email or contact number already exists."
}
```

</ApiEndpoint>
