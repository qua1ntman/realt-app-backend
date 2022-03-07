import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../auth/modules/user.interface';

@Entity('messages')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ default: '' })
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  date: Date;

  @Column()
  recipient: User;

  @Column()
  author: User;
}
