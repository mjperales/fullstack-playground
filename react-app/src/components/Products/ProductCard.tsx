import React from 'react';
import { type Product } from './ProductList';
import './ProductList.css';

export interface ProductCardProps {
  product: Product;
  isRecommended: boolean;
  onToggle: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isRecommended,
  onToggle,
}) => {
  const { name, category, rating, description } = product;
  return (
    <div className="card" role="group" aria-label={`${product.name} card`}>
      <div>
        <h2 className="card-title">{name}</h2>
        <p className="card-category">{category}</p>
        {description && <p>{description}</p>}
        <p className="card-rating">{rating}</p>
      </div>
      <button
        className={`card-button ${isRecommended ? 'active' : ''}`}
        name={product.id.toString()}
        onClick={() => onToggle(product.id)}
        type="button"
      >
        {isRecommended ? 'Recommended' : 'Recommend'}
      </button>
    </div>
  );
};

export default ProductCard;
