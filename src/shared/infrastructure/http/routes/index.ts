import express, { NextFunction, Request, Response } from 'express';

import authenticateRoutes from './authenticate.routes';
import carRoutes from './cars.routes';
import categoriesRoutes from './categories.routes';
import specificationRoutes from './specification.routes';
import userRoutes from './users.routes';

const router = express.Router();

router.use('/category', categoriesRoutes);
router.use('/specification', specificationRoutes);
router.use('/user', userRoutes);
router.use('/authenticate', authenticateRoutes);
router.use('/car', carRoutes);

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).send('Hello Mario!');
});

export default router;
