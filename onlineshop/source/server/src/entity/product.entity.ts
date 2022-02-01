import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  size: string;

  @Column()
  color: string;

  @Column()
  price: number;

  @Column()
  categoryId: number;
}
