import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCars.dto';
import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
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
}

export { CarsRepository };
