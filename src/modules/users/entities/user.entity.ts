import { Transform } from 'class-transformer'
import { IsDateString } from 'class-validator'
import { STATE } from 'src/constants/state.enum'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text', nullable: false, unique: true })
  userName: string

  @Column({ type: 'text', nullable: false, unique: true })
  email: string

  @Column({ type: 'text', nullable: false })
  password: string

  @Column({ type: 'text', nullable: false })
  country: string

  @Column()
  @IsDateString()
  @Transform(({ value }) => value.toISOString().split('T')[0])
  birthDate: Date

  @CreateDateColumn()
  creationDate: Date

  @Column({ type: 'int', default: 0 })
  followers: number

  @Column({ type: 'int', default: 0 })
  following: number

  @Column({ type: 'text', nullable: false, array: true })
  interests: string

  @Column({ type: 'text', nullable: false })
  avatar: string

  @Column({
    type: 'text',
    default:
      'https://e0.pxfuel.com/wallpapers/696/294/desktop-wallpaper-grey-color-background-solid-color-background.jpg',
  })
  background: string

  @Column({ type: 'int', default: 0 })
  notifications: number

  @Column({ type: 'enum', enum: STATE, default: STATE.ACTIVE })
  state: number
}
