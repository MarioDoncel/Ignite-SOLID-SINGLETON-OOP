/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import Specification from '@modules/cars/infrastructure/typeorm/entities/Specification';

import ISpecificationsRepository, {
  ICreateSpecificationDTO,
} from '../ISpecifications.repository';

export class SpecificationsRepositorieInMemory
  implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
    return specification;
  }
  async list(): Promise<Specification[]> {
    return this.specifications;
  }
  async findByName(name: string): Promise<Specification | undefined> {
    return this.specifications.find(
      (specification) => specification.name === name
    );
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.specifications.filter(current => ids.includes(current.id));
  }
}