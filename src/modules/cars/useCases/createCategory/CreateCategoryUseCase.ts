import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import ICategoriesRepository from '../../repositories/ICategories.repository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists', 409);
    }

    this.categoriesRepository.create({ name, description });
  }
}

export default CreateCategoryUseCase;
