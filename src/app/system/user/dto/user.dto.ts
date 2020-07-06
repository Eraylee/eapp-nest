import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class UserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsOptional()
  @PrimaryGeneratedColumn()
  username: string;

  @ApiProperty({
    description: '昵称',
  })
  // @IsOptional({ groups: [UPDATE] })
  @IsOptional()
  @IsString({ always: true })
  @Column()
  nickname: string;

  @ApiProperty({
    description: '密码',
  })
  @IsString({ always: true })
  password: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsString({ always: true })
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsString({ always: true })
  email: string;
}
