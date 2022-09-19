import { DeepPartial, getRepository, Repository, UpdateResult } from 'typeorm';

import { ICreateUserDto } from '../../../dtos/ICreateUserDto';
import { IUpdateUserDto } from '../../../dtos/IUpdateUserDto';
import { IUsersRepository } from '../../../repositories/IUserRepository';
import User from '../entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create({ password, ...userData }: ICreateUserDto): Promise<User> {
    const user = this.repository.create({ ...userData, password });
    await this.repository.save(user);
    return user;
  }
  async update(updateData: IUpdateUserDto): Promise<User> {
    return this.repository.save(updateData);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.repository.findOne({ email });
  }
  async findById(id: string): Promise<User | undefined> {
    return this.repository.findOne(id);
  }
}
