import { NextFunction, Request, Response } from "express"
import CreateEspecificationUseCase from "./CreateSpecificationUseCase"


class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateEspecificationUseCase){}
  handle(req: Request, res: Response, next: NextFunction): Response {
    const { name, description } = req.body
  
    this.createSpecificationUseCase.execute({name, description})
  
    return res.status(201).send()
  }
}

export {CreateSpecificationController}