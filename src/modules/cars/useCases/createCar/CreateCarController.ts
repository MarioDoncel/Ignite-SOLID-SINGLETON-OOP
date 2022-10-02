import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './createCarUseCase';

class CreateCarController {
  async handle(
    req: Request,
    res: Response,
    _next: NextFunction
  ): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = req.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
