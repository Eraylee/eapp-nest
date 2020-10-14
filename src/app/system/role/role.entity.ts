import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { MenuEntity } from '../menu/menu.entity';
import { BaseEntity } from '@/common/entities/base.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  @ManyToMany(
    () => MenuEntity,
    menu => menu.roles,
    {
      cascade: true,
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE',
      eager: true,
    },
  )
  @JoinTable()
  menus: MenuEntity[];
}
