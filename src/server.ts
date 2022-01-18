/* eslint-disable no-console */
import express from 'express';
import routes from './routes';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'

import swaggerFile from './swagger.json'

const app = express();
const PORT = 3333;
const URL = 'http://localhost';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes);

app.listen(PORT, () => console.log(`⚡️:Server is listening on ${URL}:${PORT}`));
