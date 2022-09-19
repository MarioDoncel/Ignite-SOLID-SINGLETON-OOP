import { AppError } from '@shared/exceptions/AppError';

import { InMemoryUsersRepository } from '../../repositories/inMemory/InMemoryUserRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let usersRepository: InMemoryUsersRepository;
  const email = 'email@email.com';
  const password = '1234';
  const name = 'Nome';
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
    await createUserUseCase.execute({
      driver_license: '123',
      email,
      name,
      password,
      username: 'Username',
    });
  });

  it('Should be able to authenticate an user', async () => {
    const autenthicatedUser = await authenticateUserUseCase.execute({
      email,
      password,
    });
    expect(autenthicatedUser).toHaveProperty('token');
    expect(autenthicatedUser).toHaveProperty('user');
    expect(autenthicatedUser.user.name).toEqual(name);
    expect(autenthicatedUser.user.email).toEqual(email);
  });
  it('Should not be able to authenticate an non-existent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'email2@email.com',
        password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate an user with incorrect password', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email,
        password: '4321',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
