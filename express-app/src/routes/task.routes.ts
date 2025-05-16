import { Router } from 'express';
import { createTask } from '../controllers/task.controller';

const router = Router();

router.post('/create/task', createTask);

export default router;
