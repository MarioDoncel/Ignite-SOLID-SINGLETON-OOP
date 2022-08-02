/* eslint-disable @typescript-eslint/indent */
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('users')
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column()
  driverLicense!: string;

  @Column()
  is_admin!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Category;
