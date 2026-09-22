const { createService } = require('../create-service.cjs');
createService({ name: 'customer-service', port: 3104, route: 'customers', data: [{ id: 'guest-1', name: 'Amelia Chen', visits: 18, segment: 'regular' }] });
