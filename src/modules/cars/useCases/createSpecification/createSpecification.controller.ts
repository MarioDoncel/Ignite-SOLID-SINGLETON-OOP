import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEspecificationUseCase from './CreateSpecificationUseCase';

class CreateSpecificationController {
  handle(req: Request, res: Response, next: NextFunction): Response {
    const { name, description } = req.body;
    const createSpecificationUseCase = container.resolve(
      CreateEspecificationUseCase
    );
    createSpecificationUseCase.execute({ name, description });

    return res.status(201).send();
  }
}

export { CreateSpecificationController };
