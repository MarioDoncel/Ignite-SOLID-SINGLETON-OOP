import { CategoriesRepository } from "../../repositories/implementations/Categories.repository";
import CreateCategoryUseCase from "../createCategory/CreateCategoryUseCase";
import { ImportCategoryController } from "./importCategoryController";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance()

const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)

const importCategoryController = new ImportCategoryController(importCategoryUseCase)

export {importCategoryController}