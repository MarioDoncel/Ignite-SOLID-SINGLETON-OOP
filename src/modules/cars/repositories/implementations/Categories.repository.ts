import { getRepository, Repository } from 'typeorm';

import Category from '../../entities/Category';
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../ICategories.repository';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });
    await this.repository.save(category);
  }
  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category | undefined> {
    return this.repository.findOne({ name });
  }
}

export { CategoriesRepository };
