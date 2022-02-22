---
title: Compute Shipper-Chargeable Fee
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/compute-service-fee" method="post">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Body

- **customer_id_no** (string, required) Customer ID Number, 8-alphanumeric all-caps. Pattern: `^[A-Z0-9]{8}$`
- **vehicle_type_id** (uuid, required) Vehicle Type ID. Format: `uuid`
- **booking** (object, required) Pickup details.
  - **address** (string, required) Address, 255 max length.
  - **latitude** (string) Latitude.
  - **longitude** (string) Longitude.
  - **zip_code** (string, required) ZIP Code, 4-digit. Pattern: `^[0-9]{4}$`
- **deliveries** (array[object], required at least one delivery) Delivery / Deliveries details.
  - **address** (string, required) Address, 255 max length.
  - **latitude** (string) Latitude.
  - **longitude** (string) Longitude.
  - **zip_code** (string, required) ZIP Code, 4-digit. Pattern: `^[0-9]{4}$`
  - **is_charged_to_sender** (boolean, required) If the delivery service fee will be charged to the sender / pickup.

#### Example request body:

```json
{
  "customer_id_no": "ABCD1234", // from the create customer api's response
  "vehicle_type_id": "1ee18d43-5b38-45a9-9ef5-1ee3a17d90b9", // from the retrieve vehicle types api's response
  "booking": {
    "address": "Code Disruptors, Inc. Kalaw Building Complex, National Hwy Los Baños, Laguna 4030",
    "zip_code": "4030"
  },
  "deliveries": [
    {
      "address": "Bayside Calios Santa Cruz, Laguna",
      "zip_code": "4009",
      "is_charged_to_sender": true
    }
  ]
}
```

## Response

### Success

#### Status Code: 200

```json
{
  "success": true,
  "message": "Successfully computed service fee",
  "data": {
    "computation": {
      "total_distance": 25000, // total distance to be travelled by the rider
      "chargeable_distance": 25000, // distance to be charged to the sender
      "service_fee": 250, // amount to be charged to the sender (unpaid cancellation fees is not yet included)
      "deliveries": [
        {
          "order": 1, // drop order
          "distance": 25000, // distance from previous address
          "distance_from_sender": 25000, // distance from sender / pickup (delivery)
          "distance_to_sender": 25000, // distance to sender / pickup (rts)
          "service_fee": null // this will have a value if is_charged_to_sender = false
        }
      ]
    },
    "unpaid_cancellation_fees": {
      "chargeable_amount": 0, // to be charged also to the sender in this booking
      "chargeable_ref_booking_nos": [], // list of booking nos, chargeable_amount is computed from here
      "chargeable_ref_booking_ids": [], // list of booking ids, chargeable_amount is computed from here
      "non_chargeable_amount": 0, // not charged to the sender, this is already charged from previous ongoing booking that has not yet been paid but will be paid
      "non_chargeable_booking_nos": [], // list of booking nos, non_chargeable_amount is computed from here
      "cancellation_fee_limit": 450 // value in settings
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

#### Status Code: 400

```json
{
  "success": false,
  "message": "Failed to compute service fee",
  "context": "Failed validations in validateBookingViaApi",
  "errors": [
    // at least one error message will be here
    "Invalid Customer ID No.", // if provided customer_id_no is not found
    "Invalid Vehicle Type", // if provided vehicle_type_id is not found
    "Invalid pickup latitude", // if booking.latitude is provided and invalid format
    "Invalid pickup longitude", // if booking.longitude is provided and invalid format
    "Invalid drop 1 latitude", // if delivery latitude is provided and invalid format
    "Invalid drop 1 longitude", // if delivery longitude is provided and invalid format
    "Pickup with zip code '4030' is not serviceable.", // if booking.zip_code is not in covered postal code or inactive
    "Drop 1 with zip code '4009' is not serviceable." // if delivery zip_code is not in covered postal code or inactive
  ]
}
```

```json
{
  "success": false,
  "message": "Failed to compute service fee",
  "context": "Failed to geocode address or has consecutive address",
  "errors": [
    // at least one error message will be here
    "Unable to geocode pickup address (booking.address)", // if booking's lat & lng are not provided, and the provided address cannot be geocoded
    "Unable to geocode drop ({order}) address (delivery.address)", // if delivery's lat & lng are not provided, and the provided address cannot be geocoded
    "Consecutive addresses are found" // if there's consecutive lat & lng
  ],
  "data": {
    // if there's a consecutive address with the same lat & lng
    "consecutive_addresses": [
      {
        "previous": {
          "name": "Pickup (booking.address)",
          "lat": "14.178909",
          "lng": "121.2364262"
        },
        "current: {
          "name": "Drop 1 (delivery.address)",
          "lat": "14.178909",
          "lng": "121.2364262"
        }
      }
    ]
  }
}
```

</ApiEndpoint>
