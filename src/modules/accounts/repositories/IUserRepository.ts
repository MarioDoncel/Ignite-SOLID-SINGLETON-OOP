import { ICreateUserDto } from '../dtos/ICreateUserDto';
import User from '../entities/User';

export interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
}
