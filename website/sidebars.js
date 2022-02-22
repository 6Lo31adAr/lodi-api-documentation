const category = (label, items) => ({
  type: 'category',
  label,
  items,
});

const expandedCategory = (label, items) => ({
  type: 'category',
  label,
  collapsed: false,
  items,
});

module.exports = {
  docs: [
    'introduction',
    'authentication',
    expandedCategory('API', [
      'api/create-customer',
      'api/retrieve-vehicle-types',
      'api/compute-shipper-chargeable-fee',
      'api/create-confirmed-booking',
      'api/cancel-booking',
      'api/retry-pairing',
      'api/rider-assignment-status',
      'api/track-and-trace',
    ]),
    category('Webhook', ['webhook', 'validate-webhook']),
  ],
};
