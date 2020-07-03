import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo);
  }
}
