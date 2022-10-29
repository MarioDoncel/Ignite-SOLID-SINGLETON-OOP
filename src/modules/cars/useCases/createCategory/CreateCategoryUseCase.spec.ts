import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/inMemory/CategoriesRepositorieInMemory';

import { AppError } from '../../../../shared/exceptions/AppError';
import CreateCategoryUseCase from './CreateCategoryUseCase';

describe('Create category', () => {
  let createCategoryUseCase: CreateCategoryUseCase;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it('Should be able to create a new category', async () => {
    await createCategoryUseCase.execute({
      name: 'Nome',
      description: 'Descrição',
    });
    const createdCategory = await categoriesRepositoryInMemory.findByName(
      'Nome'
    );

    expect(createdCategory).toHaveProperty('id');
    expect(createdCategory?.name).toEqual('Nome');
  });
  it('Should not be able to create 2 categories with the same name', async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        name: 'Nome',
        description: 'Descrição',
      });
      await createCategoryUseCase.execute({
        name: 'Nome',
        description: 'Descrição',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
