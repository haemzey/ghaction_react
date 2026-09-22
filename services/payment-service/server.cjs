const { createService } = require('../create-service.cjs');
createService({ name: 'payment-service', port: 3107, route: 'payments', data: [{ id: 'payment-1', orderId: 'order-1048', amount: 84, status: 'paid' }] });
