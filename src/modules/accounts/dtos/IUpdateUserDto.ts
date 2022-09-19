import { ICreateUserDto } from './ICreateUserDto';

export interface IUpdateUserDto
  extends Partial<Omit<ICreateUserDto, 'password'>> {
  id: string;
}
