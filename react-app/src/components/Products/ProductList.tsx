import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

export interface Product {
  id: number;
  name: string;
  category: string;
  rating: number;
  description?: string;
}
export interface IProductListProps {
  products: Product[];
}

const ProductList = ({ products }: IProductListProps) => {
  const [recommended, setRecommended] = useState(new Set());
  const [currentFilter, setCurrentFilter] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | ''>('');

  const uniqueCategories: string[] = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)));
  }, [products]);

  const visibleProducts = useMemo(() => {
    // make copy
    let result = [...products];

    // filter
    if (currentFilter) {
      result = result.filter((p) => p.category === currentFilter);
    }

    // sort
    if (sortDirection) {
      result.sort((a, b) =>
        sortDirection === 'desc' ? b.rating - a.rating : a.rating - b.rating
      );
    }
    return result;
  }, [currentFilter, sortDirection, products]);

  const handleFilterClick = (category: string) => {
    setCurrentFilter((prev) => (prev === category ? '' : category));
  };

  const handleSortToggle = () => {
    setSortDirection((prev) => {
      if (prev === 'desc') return 'asc';
      if (prev === 'asc') return '';
      return 'desc';
    });
  };

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
      <h1 className="header">Products recommended: {recommended.size}</h1>
      <ul className="tags">
        {uniqueCategories.map((category) => (
          <li key={category}>
            <button
              className={`card-button ${
                currentFilter === category ? 'active' : ''
              }`}
              name={category}
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <button
        style={{ marginBottom: '1rem' }}
        className={`card-button ${sortDirection ? 'active' : ''}`}
        onClick={handleSortToggle}
      >
        Toggle sort by rating ({sortDirection || 'none'})
      </button>

      {visibleProducts.map((product) => (
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
