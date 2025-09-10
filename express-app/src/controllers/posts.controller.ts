import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';

const posts = [
  { id: 1, title: 'Best Headphones', tags: ['audio', 'reviews', 'tech'] },
  { id: 2, title: '10 Kitchen Hacks', tags: ['kitchen', 'lifestyle'] },
  {
    id: 3,
    title: 'Standing Desk Setup',
    tags: ['furniture', 'tech', 'lifestyle'],
  },
  {
    id: 4,
    title: 'Cast Iron Cooking',
    tags: ['kitchen', 'kitchen', 'reviews'],
  },
];

export const getAllPosts = asyncHandler(async (req, res) => {
  if (!posts || posts.length === 0) {
    throw new ApiError(404, 'No posts found');
  }

  res.status(200).json(posts);
});

export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    throw new ApiError(404, 'Post not found');
  }

  res.status(200).json(post);
});
