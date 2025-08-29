import { useState, useMemo } from 'react';

interface IPost {
  id: number;
  title: string;
  tags: string[];
}

interface IPostProps {
  posts: IPost[];
}

export default function TagFrequency({ posts }: IPostProps) {
  let allTags = useMemo(() => posts.flatMap((p) => p.tags), [posts]);
  const tagFrequency = useMemo(() => {
    const map = new Map();
    allTags.forEach((tag) => {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    });
    return Array.from(map);
  }, [allTags]);
  const [currentTag, setCurrentTag] = useState<null | string>(null);
  const [allPosts, setAllPosts] = useState(posts);

  const handleFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentTag === e.currentTarget.name) {
      setAllPosts(posts);
      return;
    }

    const filteredPosts = posts.filter((post) =>
      post.tags.includes(e.currentTarget.name)
    );

    setAllPosts(filteredPosts);
    setCurrentTag(e.currentTarget.name);
  };

  return (
    <section className="tag-fequency-wrapper">
      <header>
        <h1>Tags</h1>
        <ul>
          {tagFrequency.map((item) => (
            <li key={item[0]}>
              <button
                type="button"
                name={item[0]}
                onClick={(e) => handleFilter(e)}
              >{`${item[0]} (${item[1]})`}</button>
            </li>
          ))}
        </ul>
      </header>
      <div className="posts-wrapper">
        <ul>
          {allPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
