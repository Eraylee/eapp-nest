import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RoleEntity } from './role.entity';
import { PaginationResult } from '@/interfaces/result.interface';
import { QueryRoleDto, CreateRoleDto, UpdateRoleDto } from './role.dto';
import { DeleteDto } from '@/common/base/base.dto';
import { DeleteResult } from 'typeorm';

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
  async queryById(@Query('id') id: number): Promise<RoleEntity> {
    return await this.service.get(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  async queryPage(
    @Query() params: QueryRoleDto,
  ): Promise<PaginationResult<RoleEntity>> {
    return await this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  async create(@Body() params: CreateRoleDto): Promise<RoleEntity> {
    return await this.service.createRole(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  async update(@Body() params: UpdateRoleDto): Promise<RoleEntity> {
    return await this.service.updateRole(params);
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
