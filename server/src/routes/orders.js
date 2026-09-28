import { Router } from 'express';
import crypto from 'node:crypto';
import { prisma } from '../db.js';

export const ordersRouter = Router();

// POST /api/orders
// body: { customerName, customerEmail, customerPhone, items: [{ productId, quantity }] }
// Prices are always looked up server-side — never trust a price sent from the browser.
ordersRouter.post('/', async (req, res) => {
  const { customerName, customerEmail, customerPhone, items } = req.body;

  if (!customerName || !customerEmail || !customerPhone) {
    return res.status(400).json({ error: 'customerName, customerEmail and customerPhone are required.' });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must include at least one item.' });
  }

  const productIds = items.map((i) => Number(i.productId));
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });

  if (products.length !== new Set(productIds).size) {
    return res.status(400).json({ error: 'One or more products in the cart no longer exist.' });
  }

  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === Number(item.productId));
    return {
      productId: product.id,
      productName: product.name,
      unitPrice: product.price,
      quantity: Math.max(1, Number(item.quantity) || 1)
    };
  });

  const totalAmount = orderItems.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const txRef = `ADX-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`;

  const order = await prisma.order.create({
    data: {
      txRef,
      customerName,
      customerEmail,
      customerPhone,
      totalAmount,
      items: { create: orderItems }
    },
    include: { items: true }
  });

  res.status(201).json(order);
});

// GET /api/orders/:txRef
ordersRouter.get('/:txRef', async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { txRef: req.params.txRef },
    include: { items: true }
  });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  res.json(order);
});
