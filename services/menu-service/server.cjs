const { createService } = require('../create-service.cjs');
createService({ name: 'menu-service', port: 3101, route: 'menu', data: [{ id: 'dish-1', name: 'Charred citrus salmon', price: 28, status: 'live' }] });
