import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsDefined, IsString } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { ApiProperty } from '@nestjs/swagger';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class UserDto {
  @ApiProperty({
    description: '用户名',
  })
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn()
  username: string;

  @ApiProperty({
    description: '昵称',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Column()
  nickname: string;

  @ApiProperty({
    description: '密码',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  password: string;

  @ApiProperty({
    description: '手机号码',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  phone: string;

  @ApiProperty({
    description: '邮箱',
  })
  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  email: string;
}
