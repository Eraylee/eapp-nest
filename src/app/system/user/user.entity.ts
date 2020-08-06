import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';
import { RoleEntity } from '../role/role.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 30 })
  nickname: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  email: string;

  @Column({ type: 'char', length: 64, select: false })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  avatar: string;

  @ManyToMany(() => RoleEntity, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  roles: RoleEntity[];
}
