import express, { Request, Response, Router } from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';

// REST API
import itemsRoutes from './routes/item.routes';
import taskRoutes from './routes/task.routes';
import fruitRoutes from './routes/fruit.routes';

// GraphQl
import { typeDefs } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { errorHandler } from './errroHandler';

const app = express();
const port = 3001;
const apiRouter = Router();

// Routes
apiRouter.use('/items', itemsRoutes);
apiRouter.use('/tasks', taskRoutes);
apiRouter.use('/fruits', fruitRoutes);

// REST Middleware
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

// must be last
app.use(errorHandler);

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

app.listen(port, () => {
  console.log(`🚀 REST Server ready at http://localhost:${port}`);
  console.log(`🚀 GraphQL API ready at http://localhost:${port}/graphql`);
});
