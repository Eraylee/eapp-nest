import { Injectable } from '@nestjs/common';
import { BaseService } from '@/common/base/base.service';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity) readonly repo: Repository<MenuEntity>,
  ) {
    super(repo);
  }
}
