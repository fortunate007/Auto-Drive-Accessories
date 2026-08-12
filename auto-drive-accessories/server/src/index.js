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

// Fallback error handler so a thrown error returns JSON instead of crashing silently
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Auto-Drive API running on http://localhost:${port}`);
});
