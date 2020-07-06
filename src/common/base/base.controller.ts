import {
  Get,
  Post,
  Body,
  Param,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { PaginationDto, DeleteDto } from './dto';
import { BaseService } from './base.service';
import { PaginationResult } from '../interface/result.interface';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@UseInterceptors(ClassSerializerInterceptor)
export class BaseController<T> {
  constructor(private baseService: BaseService<T>) {}

  /**
   * 分页查询
   * @param query
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  public async getMany(
    @Query() query: PaginationDto,
  ): Promise<PaginationResult<T>> {
    return await this.baseService.getPage(query);
  }
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async getOne(@Param('id') id: number): Promise<T> {
    return await this.baseService.get(id);
  }
  /**
   * 删除
   * @param ids
   */
  @ApiOperation({ summary: '删除' })
  @Post('delete')
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async delete(@Body() dto: DeleteDto): Promise<DeleteResult> {
    return await this.baseService.delete(dto.ids);
  }
}
