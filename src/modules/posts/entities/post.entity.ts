import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({type: 'text', nullable: false})
  title: string

  @Column({type: 'text', nullable: false})
  description: string

  @Column({type: 'text', nullable: false})
  resource: string

  @Column({type: 'text', nullable: false})
  creationDate: Date

  @Column({type: 'text', nullable: false})
  owner: string 

  @Column({type: 'int', default: 0})
  reactions: number

  @Column({type: 'int', default: 0})
  comments: number

  @Column({type: 'boolean', default: true})
  state: boolean

  @Column({type: 'text', array: true, nullable: false})
  tags: string

  @Column({type: 'boolean', default: false})
  spoiler: boolean
}
