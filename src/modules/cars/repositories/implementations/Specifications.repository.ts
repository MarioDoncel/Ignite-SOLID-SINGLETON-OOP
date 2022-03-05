import Specification from '../../entities/Specification';
import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '../ISpecifications.repository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];
  constructor() {
    this.specifications = [];
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification: Specification = new Specification();
    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}

export { SpecificationsRepository };
