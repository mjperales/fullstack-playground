import { useRef, useState } from 'react';
export interface Article {
  id: number;
  title: string;
  upvotes: number;
  date: string;
}

type ArticleProps = {
  articles: Array<Article>;
};

function Articles({ articles }: ArticleProps) {
  const uniqueVisitors: Map<number, Set<string>> = new Map();
  const unique = useRef(uniqueVisitors);
  const [tick, setTick] = useState(0);

  const trackVisit = (articleId: number, visitorId: string) => {
    let article = unique.current.get(articleId);
    if (article && !article.has(visitorId)) {
      article.add(visitorId);
    } else if (!article) {
      const visitorSet: Set<string> = new Set();
      unique.current.set(articleId, visitorSet.add(visitorId));
    }
    // trick to re-render and grab correct visitor count
    setTick(tick + 1);
  };

  const handleSimulateVisit = (e: React.MouseEvent<HTMLButtonElement>) => {
    let randomVisitor = Math.random();
    trackVisit(parseInt(e.currentTarget.id), randomVisitor.toString());
  };

  const getUniqueCount = (articleId: number) => {
    return unique.current.get(articleId)?.size ?? 0;
  };

  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Unique Visitors</th>
            <th>Date</th>
            <th>Simulate</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr data-testid="article" key={article.title}>
              <td data-testid="article-title">{article.title}</td>
              <td data-testid="article-upvotes">{article.upvotes}</td>
              <td data-testid="article-visitors">
                {getUniqueCount(article.id)}
              </td>
              <td data-testid="article-date">{article.date}</td>
              <td data-testid="simulate-btn">
                <button
                  onClick={(e) => handleSimulateVisit(e)}
                  id={article.id.toString()}
                  type="button"
                >
                  Simulate Visit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
