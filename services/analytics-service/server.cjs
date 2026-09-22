const { createService } = require('../create-service.cjs');
createService({ name: 'analytics-service', port: 3109, route: 'analytics', data: [{ metric: 'revenue', value: 24681, period: 'this-week' }] });
