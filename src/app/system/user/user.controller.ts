import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { BaseController } from '@/common/base/base.controller';
import { ApiOperation } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController extends BaseController<UserEntity> {
  constructor(public service: UserService) {
    super(service);
  }
  /**
   * 新增
   * @param user
   */
  @ApiOperation({ summary: '新增用户' })
  @Post('create')
  async create(@Body() user: UserDto): Promise<UserEntity> {
    return await this.service.create(user);
  }

  /**
   * 修改
   * @param user
   */
  @ApiOperation({ summary: '新增用户' })
  @Post('update')
  async update(@Body() user: UserDto): Promise<UserEntity> {
    return await this.service.update(1, user);
  }
}
