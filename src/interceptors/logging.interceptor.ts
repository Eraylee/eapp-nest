import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Elog } from '@/utils/elog.util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();
    return next.handle().pipe(
      tap(res => {
        const logFormat = `
        ------------------------------------------------------------------
              Request url: ${req.url}
              Method: ${req.method}
              IP: ${req.ip}
              Status：${200}
              res : ${JSON.stringify(res)}
        -------------------------------------------------------------------
      `;
        Elog.access(logFormat);
        Elog.log(logFormat);
      }),
    );
  }
}
