// Thin wrapper around the Flutterwave v3 REST API.
// Docs: https://developer.flutterwave.com/docs/collecting-payments/standard

const BASE_URL = 'https://api.flutterwave.com/v3';

function authHeaders() {
  const secretKey = process.env.FLW_SECRET_KEY;
  if (!secretKey) {
    throw new Error('FLW_SECRET_KEY is not set. Copy .env.example to .env and add your Flutterwave keys.');
  }
  return {
    Authorization: `Bearer ${secretKey}`,
    'Content-Type': 'application/json'
  };
}

// Creates a hosted payment link. The link shows every method Flutterwave
// supports for the given currency/country — for KES that includes card
// payments and M-Pesa — so we don't have to build separate flows for each.
export async function createPaymentLink(order) {
  const payload = {
    tx_ref: order.txRef,
    amount: order.totalAmount,
    currency: order.currency,
    redirect_url: `${process.env.CLIENT_URL}/order/success`,
    customer: {
      email: order.customerEmail,
      name: order.customerName,
      phonenumber: order.customerPhone
    },
    customizations: {
      title: 'Auto-Drive Accessories',
      description: `Order ${order.txRef}`
    }
  };

  const res = await fetch(`${BASE_URL}/payments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.status !== 'success') {
    throw new Error(data.message || 'Flutterwave rejected the payment request.');
  }
  return data.data.link; // URL to redirect the browser to
}

// Confirms what actually happened with a transaction. Always re-check the
// amount/currency/status server-side — never trust the redirect alone.
export async function verifyTransactionByTxRef(txRef) {
  const res = await fetch(`${BASE_URL}/transactions/verify_by_reference?tx_ref=${encodeURIComponent(txRef)}`, {
    headers: authHeaders()
  });
  const data = await res.json();
  if (data.status !== 'success') {
    throw new Error(data.message || 'Could not verify transaction.');
  }
  return data.data; // includes status, amount, currency, payment_type
}
