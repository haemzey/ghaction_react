const { createService } = require('../create-service.cjs');
createService({ name: 'promotion-service', port: 3110, route: 'promotions', data: [{ id: 'promo-1', name: 'Tuesday table', discount: '15%', active: true }] });
