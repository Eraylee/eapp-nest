import {
  Column,
  Entity,
  ManyToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';
import { Visiable, MenuTypes } from '@/enums';
import { RoleEntity } from '../role/role.entity';

@Entity('menu')
@Tree('materialized-path')
export class MenuEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  action: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string;

  @Column({ type: 'smallint' })
  type: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  path: string;

  @Column({ type: 'smallint', default: Visiable.TRUE })
  visiable: Visiable;

  @ManyToMany(() => RoleEntity)
  roles: RoleEntity[];

  @TreeChildren({
    cascade: true,
  })
  children: MenuEntity[];

  @TreeParent()
  parent: MenuEntity;
}
