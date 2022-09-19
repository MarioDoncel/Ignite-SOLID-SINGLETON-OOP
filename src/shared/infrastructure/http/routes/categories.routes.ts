import express, { NextFunction, Request, Response } from 'express';
import multer from 'multer';

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/importCategoryController';
import { ListCategoryController } from '../../../../modules/cars/useCases/ListCategories/ListCategoryController';

const router = express.Router();
const upload = multer({
  dest: './tmp/uploads/',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryController = new ListCategoryController();

router.post('/', createCategoryController.handle);

router.get('/', listCategoryController.handle);

router.post('/import', upload.single('file'), importCategoryController.handle);

export default router;
