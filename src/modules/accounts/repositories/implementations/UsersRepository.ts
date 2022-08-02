import { getRepository, Repository } from 'typeorm';

import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import User from '../../entities/User';
import { IUsersRepository } from '../IUserRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create({ password, ...userData }: ICreateUserDto): Promise<void> {
    const user = this.repository.create({ ...userData, password });
    await this.repository.save(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }
}
