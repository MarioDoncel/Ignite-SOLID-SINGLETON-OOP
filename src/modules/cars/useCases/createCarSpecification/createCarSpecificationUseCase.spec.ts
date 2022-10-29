import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';
import { SpecificationsRepositorieInMemory } from '@modules/cars/repositories/inMemory/SpecificationsRepositorieInMemory';

import { AppError } from '@shared/exceptions/AppError';

import CreateCarSpecificationUseCase from './createCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositorieInMemory: SpecificationsRepositorieInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositorieInMemory = new SpecificationsRepositorieInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      specificationsRepositorieInMemory,
      carsRepositoryInMemory
    );
  });
  it('Should return error when car dont exists', async () => {
    const car_id = '12345';
    const specification_ids = ['12345'];
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specification_ids,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should be able to add  a new specification to car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'dhaihdisa',
      daily_rate: 100,
      description: 'Descrição',
      fine_amount: 60,
      license_plate: 'ABC-1234',
      name: 'Nome',
    });

    const specification = await specificationsRepositorieInMemory.create({
      description: 'Descrição',
      name: 'NOme',
    });

    const specification_ids = [specification.id];
    const response = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specification_ids,
    });
    expect(response).toHaveProperty('specifications');
    expect(
      response.specifications.every((item) =>
        specification_ids.includes(item.id)
      )
    ).toBeTruthy();
  });
});
