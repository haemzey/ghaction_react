const servicePaths = [
  '/api/menu',
  '/api/orders',
  '/api/reservations',
  '/api/customers',
  '/api/kitchen',
  '/api/delivery',
  '/api/payments',
  '/api/notifications',
  '/api/analytics',
  '/api/promotions'
];

async function request(path, options = {}) {
  const response = await fetch(path, { headers: { 'Content-Type': 'application/json', ...options.headers }, ...options });
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message || 'Service request failed');
  return payload;
}

export const serviceApi = {
  health: () => Promise.all(servicePaths.map((path) => request(path))),
  list: (path) => request(path),
  create: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) })
};
