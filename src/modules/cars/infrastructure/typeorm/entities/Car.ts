/* eslint-disable @typescript-eslint/indent */
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import Category from './Category';

@Entity('cars')
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  available!: boolean;

  @Column()
  daily_rate!: number;

  @Column()
  license_plate!: string;

  @Column()
  fine_amount!: number;

  @Column()
  brand!: string;

  @Column()
  category_id!: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
    this.available = true;
  }
}

export default Car;
