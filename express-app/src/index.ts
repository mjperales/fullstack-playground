import express, { Request, Response } from 'express';
import itemsRoutes from './routes/item.routes';

const app = express();
const port = 3001;

// Middleware to parse JSON
app.use(express.json());
app.use('/api/items', itemsRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});
