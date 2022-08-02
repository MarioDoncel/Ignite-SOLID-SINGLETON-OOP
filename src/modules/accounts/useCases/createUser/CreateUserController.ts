import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userData = request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute(userData);
    return response.status(201).send();
  }
}
