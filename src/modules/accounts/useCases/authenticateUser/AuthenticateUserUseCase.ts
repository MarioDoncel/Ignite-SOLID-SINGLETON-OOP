import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';

import { IUsersRepository } from '../../repositories/IUserRepository';

const { JWT_SECRET } = process.env;

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    email: string;
    name: string;
  };
  token: string;
}
@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (!userExists) {
      throw new AppError('Email or password incorrect', 400);
    }
    const autheticated = compare(password, userExists.password);
    if (!autheticated) {
      throw new AppError('Email or password incorrect', 400);
    }
    const token = sign({ email }, (JWT_SECRET as string) || 'secret', {
      subject: userExists.id,
      expiresIn: '1d',
    });
    return { user: { name: userExists.name, email: userExists.email }, token };
  }
}
