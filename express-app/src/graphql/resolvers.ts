type User = {
  id: string;
  name: string;
  email: string;
};

type Post = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

// In-memory mock data
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
];

const posts: Post[] = [
  {
    id: '101',
    title: 'GraphQL Basics',
    content: 'Learn GraphQL step-by-step.',
    authorId: '1',
  },
  {
    id: '102',
    title: 'Express with TypeScript',
    content: 'Type your APIs!',
    authorId: '2',
  },
];

export const resolvers = {
  Query: {
    users: () => users,
    posts: () => posts,
    user: (_: any, { id }: { id: string }) =>
      users.find((user) => user.id === id),
    post: (_: any, { id }: { id: string }) =>
      posts.find((post) => post.id === id),
  },

  Mutation: {
    createUser: (_: any, { name, email }: { name: string; email: string }) => {
      const newUser = { id: Date.now().toString(), name, email };
      users.push(newUser);
      return newUser;
    },
    createPost: (
      _: any,
      {
        title,
        content,
        authorId,
      }: { title: string; content: string; authorId: string }
    ) => {
      const newPost = { id: Date.now().toString(), title, content, authorId };
      posts.push(newPost);
      return newPost;
    },
  },

  User: {
    posts: (parent: User) =>
      posts.filter((post) => post.authorId === parent.id),
  },

  Post: {
    author: (parent: Post) => users.find((user) => user.id === parent.authorId),
  },
};
