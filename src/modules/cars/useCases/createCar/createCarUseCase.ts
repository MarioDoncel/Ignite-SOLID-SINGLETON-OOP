import Car from '@modules/cars/infrastructure/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/exceptions/AppError';

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<Car> {
    const plateAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );
    if (plateAlreadyExists) {
      throw new AppError('License plate already exists');
    }
    return this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
  }
}

export { CreateCarUseCase };
