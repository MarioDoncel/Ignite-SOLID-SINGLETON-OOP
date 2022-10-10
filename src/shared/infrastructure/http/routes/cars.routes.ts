import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import express from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

router.post('/', ensureAuthentication, ensureAdmin, createCarController.handle);
router.get('/available', listAvailableCarsController.handle);

export default router;
