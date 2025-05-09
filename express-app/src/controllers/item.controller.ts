import { Request, Response } from 'express';

const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  { id: '4', name: 'Item 4' },
  { id: '5', name: 'Item 5' },
];

export const createItem = (req: Request, res: Response): void => {
  const { id, name } = req.body;

  res.status(201).json({ message: 'Item created', item: { id, name } });
};

export const getItem = (req: Request, res: Response): void => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);

  if (!item) {
    res.status(404).json({ message: 'Item not found' });
    return;
  }

  res.status(200).json(item);
};

export const getAllItems = (req: Request, res: Response) => {
  res.status(200).json(items);
};
