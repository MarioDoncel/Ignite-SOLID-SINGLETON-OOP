import { SpecificationsRepository } from "../../repositories/implementations/Specifications.repository";
import { CreateSpecificationController } from "./createSpecification.controller";
import CreateEspecificationUseCase from "./CreateSpecificationUseCase";


const specificationsRepository = new SpecificationsRepository()
const createSpecificationUseCase = new CreateEspecificationUseCase(specificationsRepository)
const createSpecificationController = new CreateSpecificationController(createSpecificationUseCase)

export {createSpecificationController}