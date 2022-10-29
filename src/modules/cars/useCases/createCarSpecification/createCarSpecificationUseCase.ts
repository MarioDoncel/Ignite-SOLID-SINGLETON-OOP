import Car from '@modules/cars/infrastructure/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import ISpecificationsRepository from '../../repositories/ISpecifications.repository';

interface IRequest {
  car_id: string;
  specification_ids: string[];
}
@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject('specificationsRepository')
    private specificationsRepository: ISpecificationsRepository,
    @inject('specificationsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({ car_id, specification_ids }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) {
      throw new AppError('Car not found', 400);
    }
    const specifications = await this.specificationsRepository.findByIds(
      specification_ids
    );
    carExists.specifications = specifications;
    return this.carsRepository.save(carExists);
  }
}

export default CreateCarSpecificationUseCase;
