import { Injectable } from '@nestjs/common';
import { BaseService } from '@/common/base/base.service';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) readonly repo: Repository<RoleEntity>,
  ) {
    super(repo);
  }
}
