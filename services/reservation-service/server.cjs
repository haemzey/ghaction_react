const { createService } = require('../create-service.cjs');
createService({ name: 'reservation-service', port: 3103, route: 'reservations', data: [{ id: 'reservation-1', guest: 'Maya Rodriguez', time: '7:00 PM', guests: 4, status: 'seated' }] });
