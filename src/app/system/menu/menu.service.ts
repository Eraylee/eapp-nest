import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from '@/common/base/base.service';
import { MenuEntity } from './menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TreeRepository } from 'typeorm';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { JwtPayload } from '@/app/auth/jwt-payload.interface';

@Injectable()
export class MenuService extends BaseService<MenuEntity> {
  constructor(
    @InjectRepository(MenuEntity) readonly repo: Repository<MenuEntity>,
    @InjectRepository(MenuEntity) readonly treeRepo: TreeRepository<MenuEntity>,
  ) {
    super(repo);
  }
  public async getMenuTree(): Promise<MenuEntity[]> {
    const tree = await this.treeRepo.findTrees();
    return tree;
  }

  /**
   * 新增
   * @param dto
   */
  public async createMenu(dto: CreateMenuDto): Promise<MenuEntity> {
    const menu = new MenuEntity();
    Object.assign(menu, dto);
    if (dto.parentId) {
      const parent = await this.repo.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException('父级菜单不存在');
      }
      menu.parent = parent;
    }
    return this.repo.save(menu);
  }
  /**
   * 修改
   * @param dto
   */
  public async updateMenu(dto: UpdateMenuDto): Promise<MenuEntity> {
    const menu = await this.repo.findOne(dto.id);
    if (!menu) {
      throw new BadRequestException('菜单不存在');
    }
    Object.assign(menu, dto);
    if (dto.parentId) {
      const parent = await this.repo.findOne(dto.parentId);
      if (!parent) {
        throw new BadRequestException('父级菜单不存在');
      }
      menu.parent = parent;
    }
    return this.repo.save(menu);
  }
  /**
   * 获取当前用户菜单
   * @param user
   */
  public async getMenuTreeByUser(user: JwtPayload): Promise<MenuEntity[]> {
    const roles = user.roles;
    const menus = await this.repo
      .createQueryBuilder('menu')
      .leftJoinAndSelect('menu.roles', 'role')
      .andWhere('role.code IN (:...roles)', { roles })
      .getMany();
    return this.getTree(menus, 0);
    // const roots =
  }
  /**
   * 递归生成菜单树
   * @param menus
   * @param pid
   */
  private getTree(menus: MenuEntity[], pid: number): MenuEntity[] {
    return menus
      .filter(v => v.parent.id === pid)
      .map(v => ({ ...v, children: this.getTree(menus, v.id) }));
  }
}