import { inject, injectable } from 'tsyringe';

import Category from '../../entities/Category';
import ICategoriesRepository from '../../repositories/ICategories.repository';

@injectable()
class ListCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute(): Promise<Category[]> {
    return this.categoriesRepository.list();
  }
}

export default ListCategoryUseCase;
