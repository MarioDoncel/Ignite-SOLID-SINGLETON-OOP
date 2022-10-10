import { ICarsRepository } from '@modules/cars/repositories/ICars.repository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/inMemory/CarsRepositoryInMemory';

import { createCarMock } from '../../../../utils/Mocks/carMocks';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able to list all available cars', async () => {
    const car1 = await carsRepositoryInMemory.create(createCarMock);
    const car2 = await carsRepositoryInMemory.create({
      ...createCarMock,
      name: 'Carro2',
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car1, car2]);
  });
  it('Should be able to list all available cars by name', async () => {
    const car1 = await carsRepositoryInMemory.create(createCarMock);
    await carsRepositoryInMemory.create({
      ...createCarMock,
      name: 'Carro2',
    });
    const cars = await listAvailableCarsUseCase.execute({ name: car1.name });
    expect(cars).toEqual([car1]);
  });
  it('Should be able to list all available cars by category', async () => {
    const car1 = await carsRepositoryInMemory.create(createCarMock);
    const car2 = await carsRepositoryInMemory.create({
      ...createCarMock,
      name: 'Carro2',
      category_id: '12345',
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: '12345',
    });
    expect(cars).toEqual([car2]);
  });
});
