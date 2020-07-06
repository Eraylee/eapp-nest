import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '@/common/base/base.service';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repo: Repository<UserEntity>) {
    super(repo);
  }
}
