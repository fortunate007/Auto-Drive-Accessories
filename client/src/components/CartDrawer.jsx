import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalAmount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="drawer-backdrop" onClick={() => setIsOpen(false)}>
      <aside className="drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-head">
          <h3>Your cart</h3>
          <button className="drawer-close" onClick={() => setIsOpen(false)} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <p className="muted-note">Your cart is empty — add something from the catalog.</p>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <div className="drawer-item" key={item.productId}>
                  <div>
                    <span className="prod-pn">{item.partNumber}</span>
                    <p className="drawer-item-name">{item.name}</p>
                    <span className="prod-price"><span>KES</span>{item.price.toLocaleString()}</span>
                  </div>
                  <div className="qty-controls">
                    <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                  <button className="remove-link" onClick={() => removeItem(item.productId)}>Remove</button>
                </div>
              ))}
            </div>

            <div className="drawer-total">
              <span>Total</span>
              <span className="prod-price"><span>KES</span>{totalAmount.toLocaleString()}</span>
            </div>

            <Link to="/checkout" className="btn-solid" onClick={() => setIsOpen(false)}>
              Go to checkout
            </Link>
          </>
        )}
      </aside>
    </div>
  );
}
