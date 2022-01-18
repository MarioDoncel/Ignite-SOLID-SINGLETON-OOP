import { CategoriesRepository } from "../../repositories/implementations/Categories.repository";
import { ListCategoryController } from "./ListCategoryController";
import ListCategoryUseCase from "./ListCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance()

const listCategoryUseCase = new ListCategoryUseCase(categoriesRepository)

const listCategoryController = new ListCategoryController(listCategoryUseCase)

export {listCategoryController}