
import fs from 'fs'
import {parse} from 'csv-parse'
import { CategoriesRepository } from "../../repositories/implementations/Categories.repository";

interface IImportCategory {
  name:string,
  description:string
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository){}
  loadCategories(file:Express.Multer.File):Promise<IImportCategory[]>{
    return new Promise((res, rej)=> {
      const categories:IImportCategory[] = []

    const stream = fs.createReadStream(file.path)
    const parseFile = parse()

    stream.pipe(parseFile)
    parseFile.on('data', async ([name, description]) => categories.push({name, description}))
      .on('end', ()=> {
        fs.promises.unlink(file.path)
        res(categories)
      })
      .on('error', (err)=> rej(err))
    })
  }
  async execute(file:Express.Multer.File):Promise<void>{
    const categories = await this.loadCategories(file)
    
    categories.forEach(({name,description})=> {
      const categoryAlreadyExists = this.categoryRepository.findByName(name)
      if(!categoryAlreadyExists) this.categoryRepository.create({name, description})
    })
  }
}

export {ImportCategoryUseCase}