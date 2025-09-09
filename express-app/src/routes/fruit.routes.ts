import { Router } from 'express';
import { getFruit, getAllFruits } from '../controllers/fruit.controller';

const router = Router();

router.get('/', getAllFruits);
router.get('/:id', getFruit);

export default router;
