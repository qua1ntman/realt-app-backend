import { UserEntity } from 'src/auth/modules/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ad')
export class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default:
      'https://media.istockphoto.com/vectors/blueprint-of-building-vector-id510230824?k=20&m=510230824&s=612x612&w=0&h=r7Ja-6GUzK5QVumR79ZhLiXACHRg9oDmbQ_fH5ZGvVk=',
  })
  pic: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP()' })
  date: Date;

  @Column({ default: '' })
  title: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: '' })
  location: string;

  @Column({ default: '' })
  description: string;

  @ManyToOne(() => UserEntity)
  author: UserEntity;
}
