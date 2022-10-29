import { NextFunction, request, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCarSpecificationUseCase from './createCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { id: car_id } = request.params;
    const { specification_ids } = req.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );
    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specification_ids,
    });

    return res.status(200).json(car);
  }
}

export { CreateCarSpecificationController };
