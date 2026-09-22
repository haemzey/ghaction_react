const { createService } = require('../create-service.cjs');
createService({ name: 'delivery-service', port: 3106, route: 'delivery', data: [{ id: 'delivery-1', orderId: 'order-1047', driver: 'Jordan Lee', status: 'in-transit' }] });
