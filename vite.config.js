import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api/menu': 'http://localhost:3101',
      '/api/orders': 'http://localhost:3102',
      '/api/reservations': 'http://localhost:3103',
      '/api/customers': 'http://localhost:3104',
      '/api/kitchen': 'http://localhost:3105',
      '/api/delivery': 'http://localhost:3106',
      '/api/payments': 'http://localhost:3107',
      '/api/notifications': 'http://localhost:3108',
      '/api/analytics': 'http://localhost:3109',
      '/api/promotions': 'http://localhost:3110'
    }
  }
});
