import { useState, useMemo } from 'react';
import { type Article } from '../components/Articles/Articles';
import Articles from '../components/Articles/Articles';

const title = 'Sorting Articles';

function ArticlesPage() {
  const articles: Array<Article> = useMemo(() => {
    return [
      {
        title: 'Hey Title',
        upvotes: 12,
        date: '2021-11-11',
      },
      {
        title: 'Hola Title',
        upvotes: 2,
        date: '2018-07-03',
      },
      {
        title: 'Boom Title',
        upvotes: 1,
        date: '2020-05-15',
      },
      {
        title: 'Poo Title',
        upvotes: 6,
        date: '2020-10-03',
      },
      {
        title: 'Article Title',
        upvotes: 9,
        date: '2025-11-03',
      },
    ];
  }, []);
  const sortedUpVotes = useMemo(
    () => [...articles].sort((a, b) => a.upvotes - b.upvotes),
    [articles]
  );
  const sortedByRecent = useMemo(
    () => [...articles].sort((a, b) => b.date.localeCompare(a.date)),
    [articles]
  );
  const [current, setCurrent] = useState(sortedUpVotes);

  return (
    <div className="articles-app">
      <h1>{title}</h1>
      <div className="layout-row align-items-center justify-content-center my-20 navigation">
        <label className="form-hint mb-0 text-uppercase font-weight-light">
          Sort By
        </label>
        <button
          data-testid="most-upvoted-link"
          onClick={() => setCurrent(sortedUpVotes)}
          className="small"
        >
          Most Upvoted
        </button>
        <button
          data-testid="most-recent-link"
          onClick={() => setCurrent(sortedByRecent)}
          className="small"
        >
          Most Recent
        </button>
      </div>
      <Articles articles={current} />
    </div>
  );
}

export default ArticlesPage;
