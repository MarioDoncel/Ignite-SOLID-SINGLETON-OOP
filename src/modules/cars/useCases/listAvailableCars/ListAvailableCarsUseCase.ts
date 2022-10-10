import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository') private carsRepository: ICarsRepository
  ) {}

  async execute(params: IRequest) {
    return this.carsRepository.findAllAvailable(params);
  }
}
export { ListAvailableCarsUseCase };
