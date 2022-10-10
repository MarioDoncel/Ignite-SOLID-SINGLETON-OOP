import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCars.dto';
import {
  ICarsRepository,
  IFindAllAvailableRequest,
} from '@modules/cars/repositories/ICars.repository';
import { getRepository, Repository } from 'typeorm';

import Car from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  constructor() {
    this.repository = getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    await this.repository.save(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.repository.findOne({ license_plate });
  }
  async findAllAvailable({
    brand,
    category_id,
    name,
  }: IFindAllAvailableRequest): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder('c')
      .where('c.available = :available', { available: true });

    if (name) {
      carsQuery.andWhere('c.name = :name', { name });
    }
    if (brand) {
      carsQuery.andWhere('c.brand = :brand', { brand });
    }
    if (category_id) {
      carsQuery.andWhere('c.category_id = :category_id', { category_id });
    }
    return carsQuery.getMany();

    // return this.repository.find({
    //   where: {
    //     available: true,
    //     ...(brand ? { brand } : {}),
    //     ...(name ? { name } : {}),
    //     ...(category_id ? { category_id } : {}),
    //   },
    // });
  }
}

export { CarsRepository };
