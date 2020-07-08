import {
  Controller,
  Body,
  Request,
  Post,
  Query,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { QueryUserDto, CreateUserDto, UpdateUserDto } from './user.dto';
import { DeleteDto } from '@/common/base/base.dto';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '@/app/auth/guards/jwt-auth.guard';
import { PaginationResult } from '@/interfaces/result.interface';

@Controller()
@ApiTags('user')
@ApiBearerAuth()
export class UserController {
  constructor(private service: UserService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  async queryById(@Query('id') id: number): Promise<UserEntity> {
    return await this.service.get(id);
  }
  /**
   * 分页查询
   * @param user
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  async queryPage(
    @Query() params: QueryUserDto,
  ): Promise<PaginationResult<UserEntity>> {
    return await this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async create(@Body() params: CreateUserDto): Promise<UserEntity> {
    return await this.service.createUser(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  async update(@Body() params: UpdateUserDto): Promise<UserEntity> {
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

  /**
   * 修改个人信息
   * @param req
   * @param params
   */
  @ApiOperation({ summary: '修改个人信息' })
  @Post('updateProfile')
  async updateProfile(
    @Request() req: Request,
    @Body() params: UpdateUserDto,
  ): Promise<UserEntity> {
    return await this.service.updateProfile(req['user'], params);
  }
}
