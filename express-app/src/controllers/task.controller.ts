import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

const tasks = [
  {
    id: 1,
    title: 'Set up project repository',
    completed: true,
    dueDate: '2025-09-05',
  },
  {
    id: 2,
    title: 'Design database schema',
    completed: false,
    dueDate: '2025-09-10',
  },
  {
    id: 3,
    title: 'Implement authentication flow',
    completed: false,
    dueDate: '2025-09-15',
  },
  {
    id: 4,
    title: 'Create task management API',
    completed: true,
    dueDate: '2025-09-07',
  },
  {
    id: 5,
    title: 'Build React frontend',
    completed: false,
    dueDate: '2025-09-20',
  },
];

export const getAllTasks = asyncHandler(async (req, res) => {
  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, 'No tasks found');
  }
  res.status(200).json(tasks);
});

export const createTask = asyncHandler(async (req, res) => {
  const { id, task } = req.body;

  if (!task) {
    throw new ApiError(400, 'Task name is required');
  }
  res.status(201).json({ message: 'Task created', task: { id, task } });
});
