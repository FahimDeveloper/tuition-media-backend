import cookieParser from 'cookie-parser';
import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import notFound from './app/middleware/notFound.js';
import globalErrorHandler from './app/middleware/globalErrorHandler.js';
import router from './app/routes/index.js';

export const app: Application = express();

const allowedOrigins = ['http://localhost:7500'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  try {
    res.send('server is running');
  } catch (error) {
    console.log(error);
  }
});
app.use(notFound);
app.use(globalErrorHandler);
