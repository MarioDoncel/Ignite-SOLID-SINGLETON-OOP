import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './importCategoryUseCase';

class ImportCategoryController {
  async handle(req: Request, res: Response, next: NextFunction) {
    const { file } = req;
    if (!file) return res.status(400).send({ error: 'File not received' });
    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
    await importCategoryUseCase.execute(file);
    return res.status(200).send();
  }
}

export { ImportCategoryController };
