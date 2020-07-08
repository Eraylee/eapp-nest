import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { InjectConfig, ConfigService } from 'nestjs-config';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectConfig() readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('auth.JWT_SECRET'),
    });
  }
  /**
   * 验证用户
   * @param payload
   */
  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return payload;
  }
}
