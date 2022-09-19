import { NextFunction, request, Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import { UpdateUserAvatarUseCase } from './updateUserAvatarUseCase';

export class UpdateUserAvatarController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const { user } = res.locals;
    const avatarFile = req.file?.filename;
    if (!avatarFile) {
      throw new AppError('Avatar not received');
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatarUseCase.execute({
      userId: user.id as string,
      avatarFile,
    });

    return res.status(204).send();
  }
}
