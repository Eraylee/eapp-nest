import { IsNotEmpty, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDto, PaginationDto, UpdateDto } from '@/common/dtos/base.dto';
import { MenuEntity, MenuTypes } from './menu.entity';

// 分页查询
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
// 新增
export class CreateMenuDto extends CreateDto implements Partial<MenuEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: '菜单动作',
  })
  action: string;

  @ApiProperty({
    description: '菜单类型',
  })
  @IsNotEmpty()
  @IsDefined()
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
// 修改
export class UpdateMenuDto extends UpdateDto implements Partial<MenuEntity> {
  @ApiProperty({
    description: '名称',
  })
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @ApiProperty({
    description: '菜单动作',
  })
  action: string;

  @ApiProperty({
    description: '菜单类型',
  })
  @IsNotEmpty()
  @IsDefined()
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
