/* eslint-disable no-console */
import 'reflect-metadata';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerFile from './swagger.json';

import './database';
import './shared/container';

const app = express();
const PORT = 3333;
const URL = 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(routes);

app.listen(PORT, () =>
  console.log(`⚡️:Server is listening on ${URL}:${PORT}`)
);
