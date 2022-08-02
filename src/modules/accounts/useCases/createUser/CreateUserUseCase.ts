import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

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
    ...userData
  }: ICreateUserDto): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('User email already exists');
    }
    const passwordHash = await hash(password, 8);
    await this.usersRepository.create({
      ...userData,
      email,
      password: passwordHash,
    });
  }
}
