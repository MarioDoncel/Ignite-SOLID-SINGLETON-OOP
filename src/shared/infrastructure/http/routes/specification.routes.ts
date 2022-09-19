import express from 'express';

import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/createSpecification.controller';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();

router.use(ensureAuthentication);
const createSpecificationController = new CreateSpecificationController();

router.post('/', createSpecificationController.handle);

export default router;
