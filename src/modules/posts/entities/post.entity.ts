import { STATE } from 'src/constants/state.enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  resource: string;

  @CreateDateColumn()
  creationDate: Date;

  @Column({ type: 'text', nullable: false })
  owner: string;

  @Column({ type: 'int', default: 0 })
  reactions: number;

  @Column({ type: 'int', default: 0 })
  comments: number;

  @Column({ type: 'enum', enum: STATE, default: STATE.ACTIVE })
  state: number;

  @Column({ type: 'text', array: true, nullable: true })
  tags: string;

  @Column({ type: 'boolean', default: false })
  spoiler: boolean;
}
