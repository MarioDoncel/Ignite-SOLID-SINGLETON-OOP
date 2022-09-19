import { ICreateUserDto } from '../../dtos/ICreateUserDto';
import User from '../../infrastructure/typeorm/entities/User';
import { IUsersRepository } from '../IUserRepository';

class InMemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];
  async create(data: ICreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}

export { InMemoryUsersRepository };
