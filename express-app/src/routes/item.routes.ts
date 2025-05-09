import { Router } from 'express';
import {
  createItem,
  getItem,
  getAllItems,
} from '../controllers/item.controller';

const router = Router();

router.post('/item', createItem);
router.get('/item/:id', getItem);
router.get('/', getAllItems);

export default router;
