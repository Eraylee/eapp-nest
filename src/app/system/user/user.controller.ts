import {
  Controller,
  Body,
  Request,
  Post,
  Query,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import {
  QueryUserDto,
  CreateUserDto,
  UpdateUserDto,
  ResetPswDto,
  UpdatePswDto,
} from './user.dto';
import { DeleteResult } from 'typeorm';
// import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { DeletBatcheDto } from '@/common/dtos/base.dto';
import { PaginationResult } from '@/common/interfaces/result.interface';
// import { RoleGuard } from '@/guards/role-auth.guard';

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
  queryById(@Query('id') id: number): Promise<UserEntity> {
    return this.service.get(id);
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  queryPage(
    @Query() params: QueryUserDto,
  ): Promise<PaginationResult<UserEntity>> {
    return this.service.getPage(params);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增' })
  @Post('create')
  create(@Body() params: CreateUserDto): Promise<UserEntity> {
    return this.service.createUser(params);
  }
  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '修改' })
  @Post('update')
  // @UseGuards(JwtAuthGuard, RoleGuard)
  update(@Body() params: UpdateUserDto): Promise<UserEntity> {
    return this.service.updateUser(params);
  }
  /**
   * 删除
   * @param params
   */
  @ApiOperation({ summary: '删除' })
  @Post('deleteBatch')
  deleteBatch(@Body() params: DeletBatcheDto): Promise<DeleteResult> {
    return this.service.deleteBatch(params);
  }
  /**
   * 修改个人信息
   * @param req
   * @param params
   */
  @ApiOperation({ summary: '修改个人信息' })
  @Post('updateProfile')
  updateProfile(
    @Request() req: Request,
    @Body() params: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.service.updateProfile(req['user']?.id, params);
  }
  /**
   * 获取当前用户信息
   * @param req
   */
  @ApiOperation({ summary: '获取当前用户信息' })
  @Post('getProfile')
  getProfile(@Request() req: Request): Promise<UserEntity> {
    return this.service.get(req['user']?.id);
  }
  /**
   * 重置密码
   * @param dto
   */
  @ApiOperation({ summary: '重置密码' })
  @Post('resetPassword')
  async resetPassword(@Body() dto: ResetPswDto): Promise<UserEntity> {
    return this.service.resetPassWord(dto);
  }
  /**
   * 修改密码
   * @param dto
   */
  @ApiOperation({ summary: '修改密码' })
  @Post('updatePassword')
  async updatePassword(
    @Request() req: Request,
    @Body() dto: UpdatePswDto,
  ): Promise<UserEntity> {
    return this.service.updatePassword(req['user']?.id, dto);
  }
}
