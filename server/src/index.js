import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { productsRouter } from './routes/products.js';
import { ordersRouter } from './routes/orders.js';
import { paymentsRouter } from './routes/payments.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Central error handler — now actually reachable from async route errors
// as long as routes use asyncHandler() or call next(err) themselves.
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Something went wrong on the server.' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Auto-Drive API running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.json({ message: "Auto Drive Accessories API is running!" });
});