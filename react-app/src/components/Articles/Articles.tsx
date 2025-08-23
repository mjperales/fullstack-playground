export interface Article {
  title: string;
  upvotes: number;
  date: string;
}

type ArticleProps = {
  articles: Array<Article>;
};

function Articles({ articles }: ArticleProps) {
  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr data-testid="article" key="article-index">
              <td data-testid="article-title">{article.title}</td>
              <td data-testid="article-upvotes">{article.upvotes}</td>
              <td data-testid="article-date">{article.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
