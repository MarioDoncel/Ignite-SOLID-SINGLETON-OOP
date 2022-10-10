import { ICreateCarDTO } from '../dtos/ICreateCars.dto';
import Car from '../infrastructure/typeorm/entities/Car';

export interface IFindAllAvailableRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAllAvailable(params: IFindAllAvailableRequest): Promise<Car[]>;
}

export { ICarsRepository };
