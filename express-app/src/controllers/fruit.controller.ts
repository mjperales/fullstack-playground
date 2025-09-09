import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

const fruits = [
  { id: 1, name: 'Apple', emoji: '🍎' },
  { id: 2, name: 'Banana', emoji: '🍌' },
  { id: 3, name: 'Orange', emoji: '🍊' },
  { id: 4, name: 'Grapes', emoji: '🍇' },
  { id: 5, name: 'Strawberry', emoji: '🍓' },
  { id: 6, name: 'Watermelon', emoji: '🍉' },
  { id: 7, name: 'Pineapple', emoji: '🍍' },
  { id: 8, name: 'Mango', emoji: '🥭' },
  { id: 9, name: 'Peach', emoji: '🍑' },
  { id: 10, name: 'Kiwi', emoji: '🥝' },
  { id: 11, name: 'Blueberry', emoji: '🫐' },
  { id: 12, name: 'Raspberry', emoji: '🍇' },
  { id: 13, name: 'Blackberry', emoji: '🫐' },
  { id: 14, name: 'Cherry', emoji: '🍒' },
  { id: 15, name: 'Plum', emoji: '🍑' },
  { id: 16, name: 'Apricot', emoji: '🍑' },
  { id: 17, name: 'Pear', emoji: '🍐' },
  { id: 18, name: 'Lemon', emoji: '🍋' },
  { id: 19, name: 'Lime', emoji: '🍈' },
  { id: 20, name: 'Coconut', emoji: '🥥' },
];

export const getFruit = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fruit = fruits.find((fruit) => fruit.id === parseInt(id, 10));
  if (!fruit) {
    throw new ApiError(404, 'Fruit not found');
  }
  res.status(200).json(fruit);
});

export const getAllFruits = asyncHandler(async (req, res) => {
  if (!fruits || fruits.length === 0) {
    throw new ApiError(404, 'No fruits found');
  }
  res.status(200).json(fruits);
});
