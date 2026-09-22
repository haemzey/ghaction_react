const { createService } = require('../create-service.cjs');
createService({ name: 'kitchen-service', port: 3105, route: 'kitchen', data: [{ id: 'ticket-1048', orderId: 'order-1048', station: 'grill', status: 'preparing' }] });
