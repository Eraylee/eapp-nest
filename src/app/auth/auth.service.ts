import { Injectable } from '@nestjs/common';
import { UserService } from '@/app/system/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  /**
   * 验证用户
   * @param username
   * @param pass
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * 登录
   * @param user
   */
  async login(params: LoginDto): Promise<string> {
    const payload = { username: params.username };
    return this.jwtService.sign(payload);
  }
}
