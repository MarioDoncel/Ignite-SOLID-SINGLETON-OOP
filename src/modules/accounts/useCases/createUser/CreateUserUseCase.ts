import { inject } from 'tsyringe';

import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import { IUsersRepository } from '../../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}
  async execute(userData: ICreateUserDto): Promise<void> {
    await this.usersRepository.create(userData);
  }
}
