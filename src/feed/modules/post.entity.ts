import { UserEntity } from 'src/auth/modules/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('feed-post')
export class FeedPostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPost)
  author: UserEntity;
}
