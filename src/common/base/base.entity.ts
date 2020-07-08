import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from 'typeorm';
import { Enabled } from '../../enums';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'smallint',
    width: 1,
    default: 0,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: 'smallint',
    width: 1,
    default: Enabled.TRUE,
    comment: '是否启用',
  })
  enabled: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    comment: '描述',
  })
  description: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date;
}
