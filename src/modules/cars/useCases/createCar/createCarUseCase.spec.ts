import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { AppError } from '@shared/exceptions/AppError';

import { CreateCarUseCase } from './createCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });
  it('Should be able to create a car', async () => {
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'dhaihdisa',
      daily_rate: 100,
      description: 'Descrição',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Nome',
    });
  });
  it('A car should be created as available = true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'dhaihdisa',
      daily_rate: 100,
      description: 'Descrição',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Nome',
    });
    expect(car.available).toBe(true);
  });
  it('Should not be able to create a car with an already registered license plate', async () => {
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'dhaihdisa',
      daily_rate: 100,
      description: 'Descrição',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Nome',
    });
    expect(async () => {
      await createCarUseCase.execute({
        brand: 'Brand2',
        category_id: 'dhaihdisa2',
        daily_rate: 100,
        description: 'Descrição2',
        fine_amount: 60,
        license_plate: 'ABC-1234',
        name: 'Nome2',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
