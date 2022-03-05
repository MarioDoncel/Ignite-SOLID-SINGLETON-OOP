import { inject, injectable } from 'tsyringe';

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
      throw new Error('Category already exists');
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export default CreateEspecificationUseCase;
