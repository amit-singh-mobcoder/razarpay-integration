import express, {Request, Response} from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morganMiddleware from './logger/morgan.logger';
import { rateLimit } from 'express-rate-limit';
import { ApiError } from './utils/api-error';
import errorHandler from './middlewares/error-handler.middleware';
import { configDotenv } from 'dotenv';
configDotenv()


const app = express();

// Security
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Rate Limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_, __, ___, options) => {
    throw new ApiError(
      options.statusCode || 500,
      `Too many requests: limit of ${options.max} per ${options.windowMs / 60000} minutes.`
    );
  }
}));

// Middlewares
app.use(express.json());
app.use(morganMiddleware);



// Routes
app.get('/health', (_: Request, res: Response) => {
  res.status(200).json({ message: 'Server is healthy.' });
});

// Catch-all route for undefined routes
app.use((_: Request, res) => {
  res.status(404).json({ error: 'API endpoint is not valid.' });
});

// Error handler
app.use(errorHandler);

export { app };