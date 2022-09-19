import Category from '../../infrastructure/typeorm/entities/Category';
import ICategoriesRepository, {
  ICreateCategoryDTO,
} from '../ICategories.repository';

class PostgreCategoriesRepository implements ICategoriesRepository {
  findByName(name: string): Promise<Category> {
    console.log(name);
    throw new Error('Method not implemented.');
  }
  list(): Promise<Category[]> {
    throw new Error('Method not implemented.');
  }
  create({ name, description }: ICreateCategoryDTO): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { PostgreCategoriesRepository };
