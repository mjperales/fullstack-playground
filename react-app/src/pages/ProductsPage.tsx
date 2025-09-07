import ProductList from '../components/Products/ProductList';
import { type Product } from '../components/Products/ProductList';

export const products: Product[] = [
  {
    id: 1,
    name: 'Noise-Cancelling Headphones',
    category: 'Audio',
    rating: 4.8,
    description:
      'Over-ear headphones with excellent noise cancellation and 30-hour battery life.',
  },
  {
    id: 2,
    name: 'Smart Toaster',
    category: 'Kitchen',
    rating: 4.2,
    description:
      'Two-slice toaster with digital controls and customizable browning settings.',
  },
  {
    id: 11,
    name: 'Travel Mug',
    category: 'Kitchen',
    rating: 2.3, // unusually low rating
    description: 'Insulated travel mug but prone to leaking after long use.',
  },
  {
    id: 3,
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    rating: 4.6,
    description:
      'Adjustable chair with lumbar support and breathable mesh design.',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    rating: 4.4,
    description:
      'Portable waterproof speaker with 12-hour playtime and deep bass.',
  },
  {
    id: 5,
    name: 'Chef’s Knife',
    category: 'Kitchen',
    rating: 4.9,
    description: '8-inch stainless steel chef’s knife with ergonomic handle.',
  },
  {
    id: 6,
    name: 'Standing Desk',
    category: 'Furniture',
    rating: 4.7,
    description:
      'Height-adjustable desk with electric controls and solid wood top.',
  },
  {
    id: 7,
    name: 'Air Purifier',
    category: 'Home',
    rating: 4.3,
    description:
      'HEPA air purifier suitable for medium-sized rooms, with quiet mode.',
  },

  {
    id: 8,
    name: 'Cast Iron Skillet',
    category: 'Kitchen',
    rating: 4.8,
    description:
      'Pre-seasoned 12-inch cast iron skillet for versatile cooking.',
  },
  {
    id: 9,
    name: 'Smart Light Bulbs',
    category: 'Home',
    rating: 4.5,
    description:
      'Wi-Fi enabled bulbs compatible with Alexa and Google Assistant.',
  },
  {
    id: 10,
    name: 'Wireless Keyboard',
    category: 'Electronics',
    rating: 4.1,
    description:
      'Slim wireless keyboard with rechargeable battery and quiet keys.',
  },

  // Edge cases

  {
    id: 12,
    name: 'Laptop Stand',
    category: 'Furniture',
    rating: 4.0,
    // no description provided
  },
  {
    id: 13,
    name: 'Noise-Cancelling Headphones (Budget)',
    category: 'Audio',
    rating: 3.8,
    description:
      'Affordable version of noise-cancelling headphones with decent performance.',
  },
];
export default function ProductsPage() {
  return <ProductList products={products} />;
}
