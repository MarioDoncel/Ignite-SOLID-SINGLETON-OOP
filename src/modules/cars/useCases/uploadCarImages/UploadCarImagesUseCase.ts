import { CarImage } from '@modules/cars/infrastructure/typeorm/entities/CarImage';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImage.Repository';
import { inject, injectable } from 'tsyringe';

import Category from '../../infrastructure/typeorm/entities/Category';
import ICategoriesRepository from '../../repositories/ICategories.repository';

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImagesRepository
  ) {}
  async execute({ car_id, images_name }: IRequest): Promise<CarImage[]> {
    const carImages = Promise.all(
      images_name.map(async (imageName) => {
        const carImage = await this.carsImageRepository.create(
          car_id,
          imageName
        );
        return carImage;
      })
    );
    return carImages;
  }
}

export default UploadCarImageUseCase;
