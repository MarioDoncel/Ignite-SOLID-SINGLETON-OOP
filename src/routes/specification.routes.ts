import express, { NextFunction, Request, Response } from 'express'

import { createSpecificationController } from '../modules/cars/useCases/createSpecification'


const router = express.Router()

router.post('/', (req: Request, res: Response, next: NextFunction) => {
  return createSpecificationController.handle(req, res, next)
})


export default router