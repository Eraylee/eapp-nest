import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';
import { UserEntity } from '../user/user.entity';
import { MenuEntity } from '../menu/menu.entity';

@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  @ManyToMany(() => MenuEntity, {
    cascade: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinTable()
  menus: MenuEntity[];
}
