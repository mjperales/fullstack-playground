import TagFrequency from '../components/TagFrequency/TagFrequency';
import { useData } from '../hooks/useData';

export default function PostsPage() {
  const { data, error, loading } = useData('http://localhost:3001/api/posts');

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>Oops! An error occured</p>;
  }

  return <TagFrequency posts={data} />;
}
