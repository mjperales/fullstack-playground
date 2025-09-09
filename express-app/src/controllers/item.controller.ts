import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

const items = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
  { id: '3', name: 'Item 3' },
  { id: '4', name: 'Item 4' },
  { id: '5', name: 'Item 5' },
];

export const createItem = asyncHandler(async (req, res) => {
  const { id, name } = req.body;
  if (!id) {
    throw new ApiError(400, 'ID is required');
  }
  res.status(201).json({ message: 'Item created', item: { id, name } });
});

export const getItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === id);
  if (!item) {
    throw new ApiError(404, 'Item no found');
  }

  res.status(200).json(item);
});

export const getAllItems = asyncHandler(async (req, res) => {
  if (!items || items.length === 0) {
    throw new ApiError(404, 'No items found');
  }
  res.status(200).json(items);
});
