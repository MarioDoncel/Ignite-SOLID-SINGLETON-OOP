import { ICreateCarDTO } from '../dtos/ICreateCars.dto';
import Car from '../infrastructure/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository };
