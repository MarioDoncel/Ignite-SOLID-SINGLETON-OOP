/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationCars1666654614839
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specification_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'specification_id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'specification_cars',
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
    await queryRunner.createForeignKey(
      'specification_cars',
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specification_cars',
      'FKSpecificationCar'
    );
    await queryRunner.dropForeignKey(
      'specification_cars',
      'FKCarSpecification'
    );
    await queryRunner.dropTable('specification_cars');
  }
}
