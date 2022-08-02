import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEspecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(
      CreateEspecificationUseCase
    );
    await createSpecificationUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
