import { CategoriesRepository } from "../../repositories/implementations/Categories.repository";
import { CreateCategoryController } from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(createCategoryUseCase)

export {createCategoryController}