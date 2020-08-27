import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Elog } from '@/utils/elog.util';
import { LoginInfoService } from '@/app/log/login-info/login-info.service';
import { JwtPayload } from '@/app/auth/jwt-payload.interface';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private service: LoginInfoService) {}
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(res => {
        const status = 200;
        const url = req.url;
        const method = req.method;
        const response = JSON.stringify(res);
        const ip = req.headers['x-real-ip'] || req['connection'].remoteAddress;
        const logFormat = `
        ------------------------------------------------------------------
              Request url: ${url}
              Method: ${method}
              IP: ${ip}
              Status：${status}
              res : ${response}
        -------------------------------------------------------------------
      `;

        Elog.log(logFormat);

        if (url === '/auth/login') {
          const user: JwtPayload = req['user'];
          const agent = req.headers['user-agent'];
          const message = res['message'];
          this.service.create({
            username: user.username,
            ip,
            agent,
            status,
            message,
          });
        }
      }),
    );
  }
}
