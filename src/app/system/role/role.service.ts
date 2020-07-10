import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '@/common/base/base.service';
import { RoleEntity } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateRoleDto, CreateRoleDto } from './role.dto';
import { MenuEntity } from '../menu/menu.entity';
import { CasbinService } from '@/app/casbin/casbin.service';

@Injectable()
export class RoleService extends BaseService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) readonly repo: Repository<RoleEntity>,
    @InjectRepository(MenuEntity) readonly menuRepo: Repository<MenuEntity>,
    private readonly casbin: CasbinService,
  ) {
    super(repo);
  }
  /**
   * 新增角色
   * @param params
   */
  async createRole(params: CreateRoleDto): Promise<RoleEntity> {
    const count = await this.repo.count({ code: params.code });
    if (count > 0) {
      throw new BadRequestException('角色编码已存在');
    }
    const role = new RoleEntity();
    let menus: MenuEntity[] = [];
    if (params.menuIds) {
      menus = await this.menuRepo.findByIds(params.menuIds);
      const policy = menus.map(v => [role.code, v.path, v.action]);
      this.casbin.enforcer.addPolicies(policy);
    }
    Object.assign(role, { ...params, menus });
    return this.repo.save(role);
  }
  /**
   * 修改
   * @param params
   */
  async updateRole(params: UpdateRoleDto): Promise<RoleEntity> {
    const role = await this.repo.findOne(params.id);
    let menus: MenuEntity[] = [];
    if (params.menuIds) {
      menus = await this.menuRepo.findByIds(params.menuIds);
      const filteredPolicy = await this.casbin.enforcer.getFilteredPolicy(
        0,
        role.code,
      );
      const addPolicies = menus.map(v => [role.code, v.path, v.action]);
      this.casbin.enforcer.removePolicies(filteredPolicy);
      this.casbin.enforcer.addPolicies(addPolicies);
    }
    Object.assign(role, { ...params, menus });
    return this.repo.save(role);
  }
}
