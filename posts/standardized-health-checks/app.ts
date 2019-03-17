import express from 'express';
import { healthRoutes } from './routes/health.routes';

const app = express();
const port = 8080;

app.get('/ping', (req, res) => {
  res.send('PONG');
});

app.use(healthRoutes);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
