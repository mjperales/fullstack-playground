import { Request, Response } from 'express';

export const createItem = (req: Request, res: Response): void => {
  const { id, name } = req.body;

  res.status(201).json({ message: 'Item created', item: { id, name } });
};

export const getItem = (req: Request, res: Response): void => {
  const { id } = req.params;

  res.json({ id, name: 'Item 1' });
};
