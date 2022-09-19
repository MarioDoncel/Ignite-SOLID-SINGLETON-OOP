/* eslint-disable no-console */
import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from '../../../swagger.json';
import { AppError } from '../../exceptions/AppError';
import routes from './routes';

import '../typeorm';
import '../../container';

const app = express();
const PORT = 3333;
const URL = 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return response.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(PORT, () =>
  console.log(`⚡️:Server is listening on ${URL}:${PORT}`)
);
