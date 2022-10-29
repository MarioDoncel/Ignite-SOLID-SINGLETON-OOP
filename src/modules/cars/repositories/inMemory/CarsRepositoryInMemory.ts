import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCars.dto';
import Car from '@modules/cars/infrastructure/typeorm/entities/Car';

import { ICarsRepository, IFindAllAvailableRequest } from '../ICars.repository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);
    this.cars.push(car);
    return car;
  }
  async save(car: Car): Promise<Car> {
    let carExists = false;
    this.cars = this.cars.map((currentCar) => {
      if (currentCar.id === car.id) {
        carExists = true;
        return car;
      }
      return currentCar;
    });
    if (!carExists) throw new Error('Car not found');
    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
  async findAllAvailable({
    brand,
    category_id,
    name,
  }: IFindAllAvailableRequest): Promise<Car[]> {
    return this.cars.filter((car) => {
      if (!car.available) return false;
      if (brand ? car.brand !== brand : false) return false;
      if (category_id ? car.category_id !== category_id : false) return false;
      if (name ? car.name !== name : false) return false;
      return true;
    });
  }
  async findById(id: string): Promise<Car | undefined> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
