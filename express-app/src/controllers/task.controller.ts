import { Request, Response } from 'express';

const tasks = [
  { id: '1876', task: 'task 1' },
  { id: '977', task: 'task 1' },
  { id: '977e', task: 'task 1' },
  { id: '97', task: 'task 1' },
  { id: '7', task: 'task 1' },
];

export const createTask = (req: Request, res: Response) => {
  const { id, task } = req.body;

  if (!task) {
    res.status(400).json({ message: 'Task name is needed' });
  }

  res.status(201).json({ message: 'Task created', task: { id, task } });
};
