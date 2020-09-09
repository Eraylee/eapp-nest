import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';
import { BaseEntity } from '@/common/base/base.entity';

@Entity('data-dictionary')
@Tree('materialized-path')
export class DataDictionaryEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 30 })
  dictionaryCode: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  dictionaryName: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  dictionaryValue: string;

  @TreeChildren({
    cascade: true,
  })
  children: DataDictionaryEntity[];

  @TreeParent()
  parent: DataDictionaryEntity;
}
