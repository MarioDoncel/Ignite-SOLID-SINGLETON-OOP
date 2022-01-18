import express, { NextFunction, Request, Response } from 'express'
import multer from 'multer'

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { importCategoryController } from '../modules/cars/useCases/importCategory'
import { listCategoryController } from '../modules/cars/useCases/ListCategories'

const router = express.Router()
const upload = multer({ 
  dest: './tmp/uploads/'
 })

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  return createCategoryController.handle(req,res, next)
})
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return listCategoryController.handle(req,res, next)
})

router.post('/import', upload.single("file"), (req: Request, res: Response, next: NextFunction) => {
  return importCategoryController.handle(req,res,next)
})



export default router