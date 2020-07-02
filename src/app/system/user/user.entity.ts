import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@/common/entitys/base.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  nickname: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 30 })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  phone: string;

  @Column({ type: 'varchar', length: 50 })
  avatar: string;

  @Column({ type: 'smallint', width: 1 })
  enabled: number;
}
