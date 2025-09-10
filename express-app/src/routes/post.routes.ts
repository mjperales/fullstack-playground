import { getAllPosts, getPost } from '../controllers/posts.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getAllPosts);
router.get('/:id', getPost);

export default router;
