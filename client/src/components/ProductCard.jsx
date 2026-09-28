import ProductIcon from './icons.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="prod-card">
      <div className="prod-figure">
        <ProductIcon name={product.icon} />
      </div>
      <div className="prod-body">
        <span className="prod-pn">{product.partNumber}</span>
        <span className="prod-name">{product.name}</span>
        <p className="prod-desc">{product.description}</p>
        <div className="prod-foot">
          <span className="prod-price"><span>KES</span>{product.price.toLocaleString()}</span>
          <span className="prod-tag">{product.category}</span>
        </div>
        <button className="btn-solid btn-small" onClick={() => addItem(product)}>
          Add to cart
        </button>
      </div>
    </div>
  );
}
