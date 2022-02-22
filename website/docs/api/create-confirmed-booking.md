---
title: Create CONFIRMED Booking
---

---

import ApiEndpoint from '@site/static/js/api_endpoint.js'

<ApiEndpoint path="/api/bookings" method="post">

## Request

### Header

- [**Authorization**](../authentication) (string, required)

### Body

- **customer_id_no** (string, required) Customer ID Number, 8-alphanumeric all-caps. Pattern: `^[A-Z0-9]{8}$`
- **vehicle_type_id** (uuid, required) Vehicle Type ID. Format: `uuid`
- **reference_no** (string, required) Booking Reference Number, 255 max length.
- **booking** (object, required) Pickup details.
  - **address** (string, required) Address, 255 max length.
  - **latitude** (string) Latitude.
  - **longitude** (string) Longitude.
  - **zip_code** (string, required) ZIP Code, 4-digit. Pattern: `^[0-9]{4}$`
  - **full_name** (string, required) Sender Full Name, 255 max length.
  - **contact_no** (string, required) Sender Contact number, 10-digit number, starts with 9. Pattern: `^9[0-9]{9}$`
  - **special_note** (string) Pickup special note, 255 max length.
- **deliveries** (array[object], required at least one delivery) Delivery / Deliveries details.
  - **address** (string, required) Address, 255 max length.
  - **latitude** (string) Latitude.
  - **longitude** (string) Longitude.
  - **zip_code** (string, required) ZIP Code, 4-digit. Pattern: `^[0-9]{4}$`
  - **is_charged_to_sender** (boolean, required) If the delivery service fee will be charged to the sender / pickup.
  - **full_name** (string, required) Receiver Full Name, 255 max length.
  - **contact_no** (string, required) Receiver Contact number, 10-digit number, starts with 9. Pattern: `^9[0-9]{9}$`
  - **items** (array[object]) Delivery items.
    - **name** (string, required) Item name, 255 max length.
    - **qty** (integer) Item quantity, minimum of 1.
    - **description** (string) Item description, 255 max length.

#### Example request body:

```json
{
  "customer_id_no": "ABCD1234", // from the create customer api's response, customer that creates the booking
  "vehicle_type_id": "1ee18d43-5b38-45a9-9ef5-1ee3a17d90b9", // from the retrieve vehicle types api's response
  "reference_no": "XXXXXXXX", // might be your own booking number
  "booking": {
    "address": "Code Disruptors, Inc. Kalaw Building Complex, National Hwy Los Baños, Laguna 4030",
    "zip_code": "4030",
    "full_name": "Joema Nequinto", // sender name
    "contact_no": "9123456789", // sender contact number
    "special_note": "Call me if you are near" // pickup special note
  },
  "deliveries": [
    {
      "address": "Bayside Calios Santa Cruz, Laguna",
      "zip_code": "4009",
      "is_charged_to_sender": true,
      "full_name": "Aubrey Nequinto", // receiver name
      "contact_no": "9123456789", // receiver contact number
      "special_note": "Near Danilas Resort", // delivery special note
      "items": [
        {
          "name": "Laptop",
          "qty": 1,
          "description": "Company laptop"
        }
      ]
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
  "message": "Successfully created booking",
  "data": {
    "reference_no": "XXXXXXXX", // from request body, might be your booking number
    "payment_mode": "CASH", // default payment mode of bookings via api
    "status": "CONFIRMED", // booking's status
    "service_fee": "250.00", // amount to be charged to the sender (unpaid cancellation fees is not yet included)
    "total_fee": "250.00", // total amount to be charged to the sender (inclusive of the chargeable amount from unpaid cancellation fees)
    "latitude": "14.141414", // pickup latitude, if not provided then the geocoded from address
    "longitude": "121.121121", // pickup longitude, if not provided then the geocoded from address
    "address": "Los Banos, Laguna", // pickup address
    "sender_name": "Joema Nequinto", // sender full name
    "sender_contact_no": "9123456789", // sender contact number, will send an SMS here upon rider start pickup trip
    "special_note": "Call me if you are here", // pickup special note
    "total_package_qty": 1, // sum of all delivery items quantity
    "total_receivers_service_fee": 0, // sum of all delivery service fee that are charged to the receiver
    "total_distance": 25000, // total distance to be travelled by the rider
    "chargeable_distance": 25000, // distance to be charged to the sender
    "total_drops": 1, // number of drops
    "deliveries": [
      // list of updated deliveries, with other fields
      {
        "order": 1, // drop order
        "status": "PENDING", // delivery pending status
        "latitude": "14.1825750", // delivery latitude, if not provided then the geocoded from address
        "longitude": "121.2413660", // delivery longitude, if not provided then the geocoded from address
        "address": "Road, Los Banos, Laguna", // delivery address
        "receiver_name": "Aubrey Nequinto", // receiver full name
        "receiver_contact_no": "9123456789", // receiver contact number
        "special_note": "Near Danilas Resort", // delivery special note
        "is_charged_to_sender": true, // if true then charged to sender, else charged to receiver
        "service_fee": null, // this will have a value if is_charged_to_sender = false
        "distance": 25000, // distance from previous address
        "distance_from_sender": 25000, // distance from sender / pickup (delivery)
        "distance_to_sender": 25000, // distance to sender / pickup (rts)
        "item_description": "Delivery Items", // default item description of bookings via api
        "items": [
          {
            "name": "Laptop",
            "qty": 1,
            "description": "Company Laptop"
          }
        ]
      }
    ],
    "unpaid_cancellation_fees": {
      "chargeable_amount": 0, // to be charged also to the sender in this booking
      "chargeable_ref_booking_nos": [], // list of booking nos, chargeable_amount is computed from here
      "chargeable_ref_booking_ids": [], // list of booking ids, chargeable_amount is computed from here
      "non_chargeable_amount": 0, // not charged to the sender, this is already charged from previous ongoing booking that has not yet been paid but will be paid
      "non_chargeable_booking_nos": [], // list of booking nos, non_chargeable_amount is computed from here
      "cancellation_fee_limit": 450 // value in settings
    },
    "has_nearby_riders": true // if true then rider pairing is ongoing, if false then no nearby riders
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
  "message": "Reference No (XXXXXX) already exists"
}
```

```json
{
  "success": false,
  "message": "CASH payment mode is not allowed due to reached cancellation fee limit",
  "context": "The sum of chargeable_amount, non_chargeable_amount, and cancellation_fee must not be greater than cancellation_fee_limit.",
  "data": {
    "total": 500,
    "chargeable_amount": 200,
    "non_chargeable_amount": 200,
    "cancellation_fee": 100,
    "cancellation_fee_limit": 450
  }
}
```

```json
{
  "success": false,
  "message": "Failed to create booking",
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
  "message": "Failed to create booking",
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
          "lng": "121.2364262",
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
