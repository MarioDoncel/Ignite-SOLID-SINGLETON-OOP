import express from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/createSpecification.controller';

const router = express.Router();

const createSpecificationController = new CreateSpecificationController();

router.post('/', createSpecificationController.handle);

export default router;
