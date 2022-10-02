import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import express from 'express';

const router = express.Router();

const createCarController = new CreateCarController();

router.post('/', createCarController.handle);

export default router;
