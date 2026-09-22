const { createService } = require('../create-service.cjs');
createService({ name: 'order-service', port: 3102, route: 'orders', data: [{ id: 'order-1048', status: 'preparing', total: 84 }] });
