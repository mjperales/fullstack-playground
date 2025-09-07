import TagFrequency from '../components/TagFrequency/TagFrequency';

export default function PostsPage() {
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
  return <TagFrequency posts={posts} />;
}
