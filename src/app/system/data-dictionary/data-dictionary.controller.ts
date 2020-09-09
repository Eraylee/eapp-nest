import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { DataDictionaryEntity } from './data-dictionary.entity';
import { DataDictionaryService } from './data-dictionary.service';
import {
  QueryDataDictionaryDto,
  CreateDataDictionaryDto,
  UpdateDataDictionaryDto,
} from './data-dictionary.dto';
import { PaginationResult } from '@/interfaces/result.interface';
import { DeleteDto } from '@/common/base/base.dto';
import { DeleteResult } from 'typeorm';

@Controller()
@ApiTags('dataDictionary')
@ApiBearerAuth()
export class DataDictionaryController {
  constructor(private service: DataDictionaryService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  async queryById(@Query('id') id: number): Promise<DataDictionaryEntity> {
    return await this.service.getById(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  async queryPage(
    @Query() params: QueryDataDictionaryDto,
  ): Promise<PaginationResult<DataDictionaryEntity>> {
    return await this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  async create(
    @Body() params: CreateDataDictionaryDto,
  ): Promise<DataDictionaryEntity> {
    return await this.service.createDataDictionary(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  async update(
    @Body() params: UpdateDataDictionaryDto,
  ): Promise<DataDictionaryEntity> {
    return await this.service.updateDataDictionary(params);
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
  /**
   * 获取全部菜单树
   */
  @ApiOperation({ summary: '获取全部菜单树' })
  @Get('getAllTree')
  async getAllTree(): Promise<DataDictionaryEntity[]> {
    return await this.service.getDataDictionaryTree();
  }
}
