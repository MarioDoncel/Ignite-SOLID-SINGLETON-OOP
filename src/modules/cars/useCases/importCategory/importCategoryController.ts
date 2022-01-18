import { NextFunction, Request, Response } from "express";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
 constructor(private importCategoryUseCase : ImportCategoryUseCase){}
 handle(req: Request, res: Response, next: NextFunction) {
  const {file} = req
  if(!file)return res.status(400). send({error: 'File not received'})

  this.importCategoryUseCase.execute(file)
  
  return res.status(200).send()
}

}

export {ImportCategoryController}