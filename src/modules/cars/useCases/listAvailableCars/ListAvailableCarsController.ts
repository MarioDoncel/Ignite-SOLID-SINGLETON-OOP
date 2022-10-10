import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
  async handle(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const { brand, name, category_id } = req.query as Record<string, string>;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );
    const cars = await listAvailableCarsUseCase.execute({
      brand,
      name,
      category_id,
    });

    return res.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
