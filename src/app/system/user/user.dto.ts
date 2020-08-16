import {
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  Length,
  IsArray,
  IsDefined,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { PaginationDto } from '@/common/base/base.dto';
/**
 * 分页查询
 */
export class QueryUserDto extends PaginationDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户名',
    required: false,
  })
  username: string;

  @ApiProperty({
    description: '昵称',
    required: false,
  })
  nickname: string;

  @ApiProperty({
    description: '手机号码',
    required: false,
  })
  phone: string;

  @ApiProperty({
    description: '邮箱',
    required: false,
  })
  email: string;
}
/**
 * 新增
 */
export class CreateUserDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户名',
  })
  @Length(1, 20)
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsDefined()
  @Length(1, 20)
  @ApiProperty({
    description: '昵称',
  })
  @IsNotEmpty()
  @IsDefined()
  nickname: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsPhoneNumber('CN')
  @IsNotEmpty()
  @IsDefined()
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '角色ids',
  })
  @IsArray()
  roleIds: number[];

  @ApiProperty({
    description: '头像',
  })
  avatar: string;
}

export class UpdateUserDto implements Partial<UserEntity> {
  @ApiProperty({
    description: '用户id',
  })
  @IsNotEmpty()
  @IsDefined()
  id: number;

  @ApiProperty({
    description: '昵称',
  })
  nickname: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsPhoneNumber('CN')
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '角色ids',
  })
  @IsArray()
  roleIds: number[];
}

export class ResetPswDto {
  @ApiProperty({
    description: '用户id',
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: '原始密码',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: '新密码',
  })
  @IsNotEmpty()
  newPassword: string;
}
