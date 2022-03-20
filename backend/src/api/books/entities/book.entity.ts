import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  media_url: string;

  @Column()
  author: string;

  @Column()
  address: string;
}
