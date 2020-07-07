import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 用户登录
   * @param params
   */
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '登录' })
  @Post('login')
  async login(@Body() params: LoginDto): Promise<string> {
    return this.authService.login(params);
  }
}
