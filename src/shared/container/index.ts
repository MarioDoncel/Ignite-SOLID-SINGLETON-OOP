import { container } from 'tsyringe';

import { UsersRepository } from '../../modules/accounts/infrastructure/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '../../modules/accounts/repositories/IUserRepository';
import { CategoriesRepository } from '../../modules/cars/infrastructure/typeorm/repositories/Categories.repository';
import { SpecificationsRepository } from '../../modules/cars/infrastructure/typeorm/repositories/Specifications.repository';
import ICategoriesRepository from '../../modules/cars/repositories/ICategories.repository';
import ISpecificationsRepository from '../../modules/cars/repositories/ISpecifications.repository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
