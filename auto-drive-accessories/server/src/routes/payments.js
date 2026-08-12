import { Router } from 'express';
import { prisma } from '../db.js';
import { createPaymentLink, verifyTransactionByTxRef } from '../lib/flutterwave.js';

export const paymentsRouter = Router();

// POST /api/payments/initiate/:txRef
// Looks up the pending order and asks Flutterwave for a hosted payment link
// that offers card + M-Pesa (mobile money) automatically for KES orders.
paymentsRouter.post('/initiate/:txRef', async (req, res) => {
  const order = await prisma.order.findUnique({ where: { txRef: req.params.txRef } });
  if (!order) return res.status(404).json({ error: 'Order not found.' });
  if (order.status === 'paid') return res.status(400).json({ error: 'Order is already paid.' });

  try {
    const link = await createPaymentLink(order);
    res.json({ link });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// GET /api/payments/verify/:txRef
// Called by the frontend right after Flutterwave redirects the customer back.
// This is a convenience check for the UI — the webhook below is the source of truth.
paymentsRouter.get('/verify/:txRef', async (req, res) => {
  const order = await prisma.order.findUnique({ where: { txRef: req.params.txRef } });
  if (!order) return res.status(404).json({ error: 'Order not found.' });

  try {
    const transaction = await verifyTransactionByTxRef(order.txRef);
    const isGenuine =
      transaction.status === 'successful' &&
      transaction.amount >= order.totalAmount &&
      transaction.currency === order.currency;

    if (isGenuine && order.status !== 'paid') {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'paid', paymentMethod: transaction.payment_type }
      });
    }

    res.json({ status: isGenuine ? 'paid' : 'failed', order });
  } catch (err) {
    res.status(502).json({ error: err.message });
  }
});

// POST /api/payments/webhook
// Server-to-server notification from Flutterwave — this is the source of
// truth for order status, since it doesn't rely on the customer's browser
// making it back to your redirect page. Configure this URL (e.g. via ngrok
// in development) in the Flutterwave dashboard under Settings -> Webhooks,
// and set the same secret hash there and in FLW_WEBHOOK_HASH.
paymentsRouter.post('/webhook', async (req, res) => {
  const signature = req.headers['verif-hash'];
  if (!signature || signature !== process.env.FLW_WEBHOOK_HASH) {
    return res.status(401).json({ error: 'Invalid webhook signature.' });
  }

  const event = req.body;
  const txRef = event?.data?.tx_ref;
  if (event.event === 'charge.completed' && txRef) {
    const order = await prisma.order.findUnique({ where: { txRef } });
    if (order) {
      // Always re-verify against Flutterwave directly rather than trusting
      // the webhook payload's own status field.
      const transaction = await verifyTransactionByTxRef(txRef);
      if (transaction.status === 'successful' && transaction.amount >= order.totalAmount) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: 'paid', paymentMethod: transaction.payment_type }
        });
      }
    }
  }

  res.status(200).json({ received: true });
});
