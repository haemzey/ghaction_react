const { createService } = require('../create-service.cjs');
createService({ name: 'notification-service', port: 3108, route: 'notifications', data: [{ id: 'notification-1', channel: 'sms', status: 'sent', message: 'Your table is ready.' }] });
