import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const autehnticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const usertoken = await autehnticateUserUseCase.execute({
      email,
      password,
    });
    response.status(200);
    return response.json(usertoken);
  }
}
