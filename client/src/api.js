// Small fetch wrapper. Requests go to /api/... which Vite proxies to the
// Express server in development (see vite.config.js). In production, serve
// the built client from the same origin as the API, or set this to the
// deployed API's full URL.
const BASE = import.meta.env.VITE_API_URL ||'';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export const api = {
  getProducts: (category) => request(`/products${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  createOrder: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrder: (txRef) => request(`/orders/${txRef}`),
  initiatePayment: (txRef) => request(`/payments/initiate/${txRef}`, { method: 'POST' }),
  verifyPayment: (txRef) => request(`/payments/verify/${txRef}`)
};
