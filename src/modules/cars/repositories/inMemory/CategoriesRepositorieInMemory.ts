import Category from '../../infrastructure/typeorm/entities/Category';
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../ICategories.repository';

export class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name }, { description });
    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.name === name);
  }
}
