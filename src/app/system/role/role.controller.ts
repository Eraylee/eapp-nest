import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { QueryRoleDto, CreateRoleDto, UpdateRoleDto } from './role.dto';
import { DeleteResult } from 'typeorm';
import { DeletBatcheDto } from '@/common/dtos/base.dto';
import { PaginationResult } from '@/common/interfaces/result.interface';

@Controller()
@ApiTags('role')
@ApiBearerAuth()
export class RoleController {
  constructor(private service: RoleService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  queryById(@Query('id') id: number): Promise<RoleEntity> {
    return this.service.get(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryRoleDto,
  ): Promise<PaginationResult<RoleEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 查询所有
   */
  @ApiOperation({ summary: '查询所有' })
  @Get('queryAll')
  queryAll(): Promise<RoleEntity[]> {
    return this.service.getAll();
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  create(@Body() params: CreateRoleDto): Promise<RoleEntity> {
    return this.service.createRole(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  update(@Body() params: UpdateRoleDto): Promise<RoleEntity> {
    return this.service.updateRole(params);
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
}
