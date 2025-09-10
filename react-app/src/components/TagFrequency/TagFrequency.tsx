import { useState, useMemo } from 'react';
import './TagFrequency.css';

export interface IPost {
  id: number;
  title: string;
  tags: string[];
}

interface IPostProps {
  posts: IPost[];
}

export default function TagFrequency({ posts }: IPostProps) {
  // First, combine all tags into an array
  // Make sure tags inside of each post are not duplicated
  const allTags = useMemo(
    () => posts.flatMap((p) => Array.from(new Set(p.tags))),
    [posts]
  );
  // Second, we remove duplicates and find frequency
  const tagFrequency = useMemo(() => {
    const map = new Map();
    allTags.forEach((tag) => {
      map.set(tag, (map.get(tag) ?? 0) + 1);
    });

    return Array.from(map).map((item) => ({
      tag: item[0],
      frequency: item[1],
    }));
  }, [allTags]);

  const [currentTag, setCurrentTag] = useState('');
  const currentPosts = useMemo(() => {
    let copy = [...posts];

    // if currentTag, then filter by that tag
    if (currentTag) {
      copy = copy.filter((p) => p.tags.includes(currentTag));
    }

    return copy;
  }, [posts, currentTag]);

  const handleCurrentTag = (tag: string) => {
    setCurrentTag((prev) => (prev === tag ? '' : tag));
  };

  return (
    <section className="tag-frequency-wrapper">
      <header>
        <h1>Tags</h1>
        <ul className="tags-wrapper">
          {tagFrequency.map((item) => (
            <li key={item.tag}>
              <button
                className={`button-styled ${
                  currentTag === item.tag ? 'active' : ''
                }`}
                type="button"
                name={item.tag}
                onClick={() => handleCurrentTag(item.tag)}
              >{`${item.tag} (${item.frequency})`}</button>
            </li>
          ))}
        </ul>
      </header>
      <div className="posts-wrapper">
        <ul>
          {currentPosts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
