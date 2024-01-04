import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  country: string;

  @Column()
  birthDate: Date;

  @Column()
  creationDate: string;

  @Column()
  followers: number;

  @Column()
  following: number;

  @Column()
  interests: string;

  @Column()
  avatar: string;

  @Column()
  background: string;

  @Column()
  notifications: number;

  @Column()
  state: boolean;
}
