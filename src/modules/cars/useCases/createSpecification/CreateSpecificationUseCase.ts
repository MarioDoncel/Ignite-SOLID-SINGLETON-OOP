import ISpecificationsRepository from "../../repositories/ISpecifications.repository";

interface IRequest {
  name: string;
  description: string
}



class CreateEspecificationUseCase {
  constructor(private specificationsRepository: ISpecificationsRepository) { }
  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name)
    if (specificationAlreadyExists) {
      throw new Error("Category already exists");
    }

    this.specificationsRepository.create({ name, description })
  }
}

export default CreateEspecificationUseCase