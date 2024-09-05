import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  // attributes delivered from client
  @Column()
  name: string;

  @Column()
  available: boolean;

  @Column()
  account_created: string;

  // attributes obtained from PokeAPI
  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  base_experience: number;
}
