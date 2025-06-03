import express, { Request, Response } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

import itemsRoutes from './routes/item.routes';
import taskRoutes from './routes/task.routes';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const port = 3001;

// REST Middleware
app.use(cors());
app.use(express.json());
app.use('/api/items', itemsRoutes);
app.use('/api/tasks', taskRoutes);

// GraphQL Setup
async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', cors(), json(), expressMiddleware(server));
}

startApolloServer(); // Start Apollo Server separately

// REST Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

app.listen(port, () => {
  console.log(`🚀 REST Server ready at http://localhost:${port}`);
  console.log(`🚀 GraphQL API ready at http://localhost:${port}/graphql`);
});
