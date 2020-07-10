import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@/common/base/base.dto';
import { MenuEntity } from './menu.entity';
import { MenuTypes } from '@/enums';
/**
 * 分页查询
 */
export class QueryMenuDto extends PaginationDto implements Partial<MenuEntity> {
  @ApiProperty({
    description: '名称',
    required: false,
  })
  name: string;

  @ApiProperty({
    description: '菜单动作',
    required: false,
  })
  action: string;

  @ApiProperty({
    description: '菜单类型',
    required: false,
    enum: MenuTypes,
  })
  type: MenuTypes;
}
/**
 * 新增
 */
export class CreateMenuDto implements Partial<MenuEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '菜单动作',
  })
  action: string;

  @ApiProperty({
    description: '菜单类型',
  })
  type: MenuTypes;

  @ApiProperty({
    description: '图标',
  })
  icon: string;

  @ApiProperty({
    description: '路径',
  })
  path: string;

  @ApiProperty({
    description: '父级菜单id',
  })
  parentId: number;
}

export class UpdateMenuDto implements Partial<MenuEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: '名称',
  })
  name: string;

  @ApiProperty({
    description: '菜单动作',
  })
  action: string;

  @ApiProperty({
    description: '菜单类型',
  })
  type: MenuTypes;

  @ApiProperty({
    description: '图标',
  })
  icon: string;

  @ApiProperty({
    description: '路径',
  })
  path: string;

  @ApiProperty({
    description: '父级菜单id',
  })
  parentId: number;
}
