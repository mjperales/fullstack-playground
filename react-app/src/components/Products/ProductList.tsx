import { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

export interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Noise-Cancelling Headphones',
    category: 'Audio',
    rating: 4.8,
  },
  { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', rating: 4.5 },
  {
    id: 3,
    name: 'Stainless Steel Cookware Set',
    category: 'Kitchen',
    rating: 4.7,
  },
];

const ProductList: React.FC = () => {
  const [recommended, setRecommended] = useState(new Set());
  const handleOnToggle = (id: number) => {
    setRecommended((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  return (
    <div className="container">
      <h1 className="header">
        {/* TODO: Show how many products are recommended */}
        Products recommended: {recommended.size}
      </h1>
      {/* TODO: Map through products and render ProductCard */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isRecommended={recommended.has(product.id)}
          onToggle={handleOnToggle}
        />
      ))}
    </div>
  );
};

export default ProductList;
