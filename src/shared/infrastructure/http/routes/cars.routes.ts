import upload from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/createCarSpecification.controller';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import express from 'express';
import multer from 'multer';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const uploadCarimages = multer(upload.upload('./tmp/carImages'));

router.post('/', ensureAuthentication, ensureAdmin, createCarController.handle);
router.post(
  '/images/:id',
  ensureAuthentication,
  ensureAdmin,
  uploadCarimages.array('images'),
  uploadCarImagesController.handle
);
router.patch(
  '/specifications/:id',
  ensureAuthentication,
  ensureAdmin,

  createCarSpecificationController.handle
);
router.get('/available', listAvailableCarsController.handle);

export default router;
