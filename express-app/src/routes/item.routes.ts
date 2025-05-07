import { Router } from 'express';
import { createItem, getItem } from '../controllers/item.controller';

const router = Router();

router.post('/item', createItem);
router.get('/item/:id', getItem);

export default router;
