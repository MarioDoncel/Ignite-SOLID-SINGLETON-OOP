import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute({
    password,
    email,
    avatar,
    ...userData
  }: ICreateUserDto): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('User email already exists', 400);
    }
    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      avatar,
      ...userData,
      email,
      password: passwordHash,
    });
  }
}
