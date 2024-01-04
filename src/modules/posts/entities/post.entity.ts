import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  resource: string

  @Column()
  creationDate: Date

  @Column()
  owner: string 

  @Column()
  reactions: number

  @Column()
  comments: number

  @Column()
  state: boolean

  @Column()
  tags: string

  @Column()
  spoiler: boolean
}
