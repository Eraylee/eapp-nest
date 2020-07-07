import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/app/system/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserEntity } from '../system/user/user.entity';

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
  async validateUser(params: JwtPayload): Promise<UserEntity> {
    return this.userService.get(params.id);
  }

  /**
   * 登录
   * @param user
   */
  async login(params: LoginDto): Promise<string> {
    const user = await this.userService.validate(
      params.username,
      params.password,
    );
    if (!user) {
      throw new UnauthorizedException('用户名或密码错误');
    }
    return this.jwtService.sign({
      id: user.id,
      username: user.username,
      roleCode: 'd',
      nickname: user.nickname,
    });
  }
}
