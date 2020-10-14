import { MenuService } from './menu.service';
import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { DeleteResult } from 'typeorm';
import { QueryMenuDto, CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { PaginationResult } from '@/common/interfaces/result.interface';
import { DeletBatcheDto } from '@/common/dtos/base.dto';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

@Controller()
@ApiTags('menu')
@ApiBearerAuth()
export class MenuController {
  constructor(private service: MenuService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<MenuEntity> {
    return this.service.getById(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryMenuDto,
  ): Promise<PaginationResult<MenuEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param params
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  create(@Body() params: CreateMenuDto): Promise<MenuEntity> {
    return this.service.createMenu(params);
  }
  /**
   * 修改
   * @param params
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  update(@Body() params: UpdateMenuDto): Promise<MenuEntity> {
    return this.service.updateMenu(params);
  }
  /**
   * 批量删除
   * @param params
   */
  @ApiOperation({ summary: '批量删除' })
  @Post('deleteBatch')
  deleteBatch(@Body() params: DeletBatcheDto): Promise<DeleteResult> {
    return this.service.deleteBatch(params);
  }
  /**
   * 获取全部菜单树
   */
  @ApiOperation({ summary: '获取全部菜单树' })
  @Get('getAllTree')
  getMenuTree(): Promise<MenuEntity[]> {
    return this.service.getMenuTree();
  }
  /**
   * 获取当前权限菜单树
   */
  @ApiOperation({ summary: '获取当前权限菜单树' })
  @UseGuards(JwtAuthGuard)
  @Get('getTree')
  getTreeByUser(@Request() req: Request): Promise<MenuEntity[]> {
    return this.service.getMenuTreeByUser(req['user']);
  }
}
