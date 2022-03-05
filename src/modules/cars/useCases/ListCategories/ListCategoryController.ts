import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCategoryUseCase from './ListCategoryUseCase';

class ListCategoryController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);
    const categories = await listCategoryUseCase.execute();

    return res.status(200).json(categories);
  }
}

export { ListCategoryController };
