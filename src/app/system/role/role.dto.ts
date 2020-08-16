import { IsNotEmpty, Length, IsArray, IsDefined } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '@/common/base/base.dto';
import { RoleEntity } from './role.entity';
/**
 * 分页查询
 */
export class QueryRoleDto extends PaginationDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '名称',
    required: false,
  })
  name: string;


  @ApiProperty({
    description: '编码',
    required: false,
  })
  @IsNotEmpty()
  @IsDefined()
  code: string;
}
/**
 * 新增
 */
export class CreateRoleDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '名称',
  })
  @Length(1, 20)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: '菜单ids',
  })
  @IsArray()
  menuIds: number[];

  @IsNotEmpty()
  @Length(1, 20)
  @ApiProperty({
    description: '昵编码称',
  })
  @IsNotEmpty()
  code: string;
}

export class UpdateRoleDto implements Partial<RoleEntity> {
  @ApiProperty({
    description: '用户id',
  })
  @IsNotEmpty()
  @IsDefined()
  id: number;

  @ApiProperty({
    description: '名称',
  })
  name: string;

  @ApiProperty({
    description: '菜单ids',
  })
  menuIds: number[];

  @ApiProperty({
    description: '编码',
  })
  code: string;
}
