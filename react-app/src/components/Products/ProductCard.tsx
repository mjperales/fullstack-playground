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
  return (
    <div className="card" role="group" aria-label={`${product.name} card`}>
      {/* TODO: Display product name, category, and rating */}
      {/* TODO: Add button that toggles recommended state */}
      <div>
        <h2 className="card-title">{product.name}</h2>
        <p className="card-category">{product.category}</p>
        <p className="card-rating">{product.rating}</p>
      </div>
      <button
        className="card-button"
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
