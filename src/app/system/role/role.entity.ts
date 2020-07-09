import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';
import { UserEntity } from '../user/user.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
