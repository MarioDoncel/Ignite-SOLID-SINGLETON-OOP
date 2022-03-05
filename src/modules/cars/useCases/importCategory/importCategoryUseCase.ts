import { parse } from 'csv-parse';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CategoriesRepository } from '../../repositories/implementations/Categories.repository';

interface IImportCategory {
  name: string;
  description: string;
}
@injectable()
class ImportCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: CategoriesRepository
  ) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((res, rej) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);
      const parseFile = parse();

      stream.pipe(parseFile);
      parseFile
        .on('data', async ([name, description]) =>
          categories.push({ name, description })
        )
        .on('end', () => {
          fs.promises.unlink(file.path);
          res(categories);
        })
        .on('error', (err) => rej(err));
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.forEach(async ({ name, description }) => {
      const categoryAlreadyExists = await this.categoryRepository.findByName(
        name
      );
      if (!categoryAlreadyExists)
        this.categoryRepository.create({ name, description });
    });
  }
}

export { ImportCategoryUseCase };
