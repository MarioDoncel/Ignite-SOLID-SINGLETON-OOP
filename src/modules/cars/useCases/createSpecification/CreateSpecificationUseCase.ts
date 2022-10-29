import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/exceptions/AppError';
import ISpecificationsRepository from '../../repositories/ISpecifications.repository';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateEspecificationUseCase {
  constructor(
    @inject('specificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists', 409);
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateEspecificationUseCase;
