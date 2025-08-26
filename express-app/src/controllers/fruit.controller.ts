import { Request, Response } from 'express';
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

export const getFruit = (req: Request, res: Response) => {
  const { id } = req.params;
  const fruit = fruits.find((fruit) => fruit.id === parseInt(id, 10));
  if (!fruit) {
    res.status(404).json({ message: 'Fruit not found' });
    return;
  }

  res.status(200).json(fruit);
};

export const getAllFruits = (req: Request, res: Response) => {
  res.status(200).json(fruits);
};
