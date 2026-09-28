import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { api } from '../api.js';

export default function Checkout() {
  const { items, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ customerName: '', customerEmail: '', customerPhone: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [error, setError] = useState('');

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('submitting');
    setError('');

    try {
      const order = await api.createOrder({
        ...form,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity }))
      });

      const { link } = await api.initiatePayment(order.txRef);

      // Remember the order reference so the success page can look it up
      // after Flutterwave redirects back.
      sessionStorage.setItem('adx-last-tx-ref', order.txRef);
      clearCart();

      // Hand off to Flutterwave's hosted checkout — it shows card and
      // M-Pesa options automatically for a KES transaction.
      window.location.href = link;
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  if (items.length === 0) {
    return (
      <section className="block wrap">
        <div className="section-head">
          <h2>Checkout</h2>
          <p>Your cart is empty. Add something from the catalog before checking out.</p>
        </div>
        <button className="btn-ghost" onClick={() => navigate('/')}>Back to shop</button>
      </section>
    );
  }

  return (
    <section className="block wrap checkout-grid">
      <form className="signboard checkout-form" onSubmit={handleSubmit}>
        <span className="eyebrow" style={{ marginBottom: 0 }}>Your details</span>

        <label>
          Full name
          <input name="customerName" value={form.customerName} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="customerEmail" value={form.customerEmail} onChange={handleChange} required />
        </label>
        <label>
          Phone (for M-Pesa &amp; delivery)
          <input type="tel" name="customerPhone" placeholder="07XXXXXXXX" value={form.customerPhone} onChange={handleChange} required />
        </label>

        {status === 'error' && <p className="form-error">{error}</p>}

        <button className="btn-solid" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Redirecting to payment…' : 'Pay with M-Pesa or card'}
        </button>
        <p className="muted-note small">
          You'll be taken to Flutterwave's secure checkout to complete payment, then brought back here.
        </p>
      </form>

      <div className="signboard order-summary">
        <span className="eyebrow" style={{ marginBottom: 0 }}>Order summary</span>
        <div className="drawer-items">
          {items.map((item) => (
            <div className="drawer-item" key={item.productId}>
              <div>
                <span className="prod-pn">{item.partNumber}</span>
                <p className="drawer-item-name">{item.name} × {item.quantity}</p>
              </div>
              <span className="prod-price"><span>KES</span>{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="drawer-total">
          <span>Total</span>
          <span className="prod-price"><span>KES</span>{totalAmount.toLocaleString()}</span>
        </div>
      </div>
    </section>
  );
}
