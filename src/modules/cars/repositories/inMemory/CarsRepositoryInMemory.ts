import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCars.dto';
import Car from '@modules/cars/infrastructure/typeorm/entities/Car';

import { ICarsRepository } from '../ICars.repository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
