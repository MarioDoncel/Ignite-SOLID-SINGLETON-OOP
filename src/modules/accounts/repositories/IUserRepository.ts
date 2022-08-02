import { ICreateUserDto } from '../dtos/ICreateUserDto';

export interface IUsersRepository {
  create(data: ICreateUserDto): Promise<void>;
}
