import { NextFunction, Response, Request } from 'express';

import { AppError } from '@shared/exceptions/AppError';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = res.locals;
  if (!user?.is_admin) {
    throw new AppError('User is not admin!');
  }
  return next();
}
