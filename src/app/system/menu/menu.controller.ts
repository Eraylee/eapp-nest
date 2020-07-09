import { MenuService } from './menu.service';
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { MenuEntity } from './menu.entity';
import { PaginationResult } from '@/interfaces/result.interface';
import { DeleteDto } from '@/common/base/base.dto';
import { DeleteResult } from 'typeorm';
import { QueryMenuDto, CreateMenuDto, UpdateMenuDto } from './menu.dto';
import { MenuTypes } from '@/enums';

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
  async queryById(@Query('id') id: number): Promise<MenuEntity> {
    return await this.service.get(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  async queryPage(
    @Query() params: QueryMenuDto,
  ): Promise<PaginationResult<MenuEntity>> {
    return await this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  async create(@Body() params: CreateMenuDto): Promise<MenuEntity> {
    return await this.service.create(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  async update(@Body() params: UpdateMenuDto): Promise<MenuEntity> {
    return await this.service.update(params);
  }
  /**
   * 删除
   * @param params
   */
  @ApiOperation({ summary: '删除' })
  @Post('delete')
  async delete(@Body() params: DeleteDto): Promise<DeleteResult> {
    return await this.service.delete(params);
  }
}
