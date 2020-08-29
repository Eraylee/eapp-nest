import { Controller, Get, Query } from '@nestjs/common';
import { LoginInfoService } from './login-info.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginInfo } from './login-info.schema';
import { PaginationResult } from '@/interfaces/result.interface';
import { PaginationDto } from '@/common/base/base.dto';

@Controller()
@ApiTags('loginInfo')
@ApiBearerAuth()
export class LoginInfoController {
  constructor(private service: LoginInfoService) {}
  /**
   * 通过id查询
   * @param id
   */
  @ApiOperation({ summary: '通过id查询' })
  @Get('queryById')
  async queryById(@Query('id') id: string): Promise<LoginInfo> {
    return await this.service.findById(id);
  }
  /**
   * 查询全部
   */
  @ApiOperation({ summary: '查询全部' })
  @Get('queryAll')
  async queryByAll(): Promise<LoginInfo[]> {
    return await this.service.findAll();
  }
  /**
   * 分页查询
   * @param params
   */
  @ApiOperation({ summary: '分页查询' })
  @Get('queryPage')
  async queryPage(
    @Query() params: PaginationDto,
  ): Promise<PaginationResult<LoginInfo>> {
    return await this.service.queryPage(params);
  }
}
