import { Controller, Get } from '@nestjs/common';
import { LoginInfoService } from './login-info.service';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { LoginInfo } from './login-info.schema';

@Controller()
@ApiTags('loginInfo')
@ApiBearerAuth()
export class LoginInfoController {
  constructor(private service: LoginInfoService) {}
  /**
   * 查询全部
   */
  @ApiOperation({ summary: '查询全部' })
  @Get('queryById')
  async queryByAll(): Promise<LoginInfo[]> {
    return await this.service.findAll();
  }
}
