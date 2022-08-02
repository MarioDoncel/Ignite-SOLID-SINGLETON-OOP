import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

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
      throw new Error('Email or password incorrect');
    }
    const autheticated = compare(password, userExists.password);
    if (!autheticated) {
      throw new Error('Email or password incorrect');
    }
    const token = sign({ email }, JWT_SECRET as string, {
      subject: userExists.id,
      expiresIn: '1d',
    });
    return { user: { name: userExists.name, email: userExists.email }, token };
  }
}
