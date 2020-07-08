import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  /**
   * 验证用户
   * @param payload
   */
  async validate(username: string, password: string): Promise<JwtPayload> {
    return await this.authService.validateUser({ username, password });
  }
}
