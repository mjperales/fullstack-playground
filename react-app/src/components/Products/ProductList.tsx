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
  const [currentProducts, setCurrentProducts] = useState(products);
  const uniqueCategories: string[] = useMemo(() => {
    const categories = products.map((product) => product.category);
    return Array.from(new Set(categories));
  }, [products]);

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentFilter(e.currentTarget.name);

    if (currentFilter !== e.currentTarget.name) {
      const filtered = products.filter(
        (product) => product.category === e.currentTarget.name
      );
      setCurrentProducts(filtered);
    } else {
      setCurrentFilter('');
      setCurrentProducts(products);
    }
  };

  const handleSortByRatingDesc = () => {
    const sortByRating = [
      ...currentProducts.sort((a, b) => b.rating - a.rating),
    ];
    console.log(sortByRating);
    setCurrentProducts(sortByRating);
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
              onClick={(e) => handleFilterClick(e)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <button
        style={{ marginBottom: '1rem' }}
        className="card-button"
        onClick={handleSortByRatingDesc}
      >
        Sort by rating
      </button>

      {currentProducts.map((product) => (
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
