import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class UserDto {
  @IsOptional({ always: true })
  @PrimaryGeneratedColumn()
  username: string;

  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsString({ always: true })
  @Column()
  nickname: string;

  @IsOptional({ groups: [UPDATE] })
  @IsDefined({ groups: [CREATE] })
  @IsNumber({}, { always: true })
  password: string;
}
