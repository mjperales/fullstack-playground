import TagFrequency from '../components/TagFrequency/TagFrequency';

export default function PostsPage() {
  const posts = [
    {
      id: 1,
      title: 'React Performance Tips',
      tags: ['react', 'performance'],
    },
    {
      id: 2,
      title: 'Understanding Maps in JS',
      tags: ['javascript', 'map', 'performance'],
    },
    { id: 3, title: 'TypeScript Basics', tags: ['typescript', 'javascript'] },
  ];
  return <TagFrequency posts={posts} />;
}
