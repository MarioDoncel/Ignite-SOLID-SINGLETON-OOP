import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoryController } from '../../../../modules/cars/useCases/ListCategories/ListCategoryController';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthentication } from '../middlewares/ensureAuthenticated';

const router = express.Router();
const upload = multer({
  dest: './tmp/uploads/',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

router.post(
  '/',
  ensureAuthentication,
  ensureAdmin,
  createCategoryController.handle
);

router.get('/', listCategoryController.handle);

router.post(
  '/import',
  ensureAuthentication,
  upload.single('file'),
  importCategoryController.handle
);

export default router;
