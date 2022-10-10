import express from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/createSpecification.controller';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();

const createSpecificationController = new CreateSpecificationController();

router.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createSpecificationController.handle
);

export default router;
