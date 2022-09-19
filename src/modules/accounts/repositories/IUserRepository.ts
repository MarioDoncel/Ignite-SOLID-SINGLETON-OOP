import { ICreateUserDto } from '../dtos/ICreateUserDto';
import User from '../infrastructure/typeorm/entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDto): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
