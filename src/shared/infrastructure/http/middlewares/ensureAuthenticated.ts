import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../../../../modules/accounts/infrastructure/typeorm/repositories/UsersRepository';
import { AppError } from '../../../exceptions/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const { sub: userId } = verify(
      token,
      process.env.JWT_SECRET as string
    ) as IPayload;
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);
    if (!user) {
      throw new AppError('User does not exists', 401);
    }
    res.locals.user = user;
    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
