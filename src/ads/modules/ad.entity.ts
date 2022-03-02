import { UserEntity } from 'src/auth/modules/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ad')
export class AdEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  pic: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTUMP' })
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
