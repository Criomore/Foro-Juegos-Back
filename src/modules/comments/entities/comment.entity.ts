import { STATE } from 'src/constants/state.enum'
import { Post } from 'src/modules/posts/entities/post.entity'
import { User } from 'src/modules/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: false })
  description: string

  @CreateDateColumn()
  creationDate: Date

  @Column({ type: 'int', default: 0 })
  reactions: number

  @Column({ type: 'enum', enum: STATE, default: STATE.ACTIVE })
  state: STATE


  //Relaciones
  @ManyToOne(() => User, (user) => user.comments)
  owner: User

  @ManyToOne(() => User, (user) => user.comments)
  post: Post
}
