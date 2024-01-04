import { STATE } from 'src/constants/state.enum';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'text', nullable: false })
  userName: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'text', nullable: false })
  country: string;

  @Column({ type: 'date', nullable: false })
  birthDate: Date;

  @Column({ type: 'date', nullable: false })
  creationDate: Date;

  @Column({ type: 'int', nullable: false })
  followers: number;

  @Column({ type: 'int', nullable: false })
  following: number;

  @Column({ type: 'text', nullable: false, array: true })
  interests: string;

  @Column({ type: 'text', nullable: false })
  avatar: string;

  @Column({
    type: 'text',
    default:
      'https://e0.pxfuel.com/wallpapers/696/294/desktop-wallpaper-grey-color-background-solid-color-background.jpg',
  })
  background: string;

  @Column({ type: 'int', default: 0 })
  notifications: number;

  @Column({ type: 'enum', enum: STATE, default: STATE.ACTIVE })
  state: boolean;
}
