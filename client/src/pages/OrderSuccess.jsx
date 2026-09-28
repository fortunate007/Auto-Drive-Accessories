import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';

export default function OrderSuccess() {
  const [status, setStatus] = useState('checking'); // checking | paid | failed | error
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const txRef = sessionStorage.getItem('adx-last-tx-ref');
    if (!txRef) {
      setStatus('error');
      return;
    }

    api
      .verifyPayment(txRef)
      .then((result) => {
        setStatus(result.status);
        setOrder(result.order);
      })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="block wrap">
      <div className="signboard" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        {status === 'checking' && (
          <>
            <span className="eyebrow" style={{ marginBottom: 0, justifyContent: 'center' }}>Checking payment</span>
            <p className="muted-note">Confirming your payment with Flutterwave…</p>
          </>
        )}

        {status === 'paid' && order && (
          <>
            <span className="eyebrow" style={{ marginBottom: 0, justifyContent: 'center' }}>Payment confirmed</span>
            <h2 style={{ margin: '14px 0' }}>Thanks, {order.customerName.split(' ')[0]}.</h2>
            <p className="muted-note">
              Order {order.txRef} for KES {order.totalAmount.toLocaleString()} is confirmed. We'll reach
              you on {order.customerPhone} to arrange delivery or pickup from Kirinyaga Road.
            </p>
          </>
        )}

        {(status === 'failed' || status === 'error') && (
          <>
            <span className="eyebrow" style={{ marginBottom: 0, justifyContent: 'center' }}>Payment not confirmed</span>
            <p className="muted-note">
              We couldn't confirm this payment. If money left your account, contact us with your phone
              number and we'll sort it out — otherwise, feel free to try again.
            </p>
          </>
        )}

        <Link to="/" className="btn-solid" style={{ marginTop: 20, display: 'inline-block' }}>
          Back to shop
        </Link>
      </div>
    </section>
  );
}
