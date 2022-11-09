import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';

import UploadCarImageUseCase from './UploadCarImagesUseCase';

interface IFile {
  filename: string;
}

class UploadCarImagesController {
  async handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response> {
    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase);
    const { id } = req.params;
    const images = req.files as IFile[];
    const images_name = images.map((file) => file.filename);
    const carImages = await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name,
    });

    return res.status(201).json(carImages);
  }
}

export { UploadCarImagesController };
