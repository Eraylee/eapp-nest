import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import Chalk from 'chalk';
import { Elog } from '@/utils/elog.util';
import { LoginInfoService } from '@/app/log/login-info/login-info.service';
import { JwtPayload } from '@/app/auth/jwt-payload.interface';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private service: LoginInfoService,
    private loggerService: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 解析ExecutionContext的数据内容获取请求体
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();

    let params = {};
    if (req.method === 'POST') {
      params = req.body;
    } else if (req.method === 'GET') {
      params = req.query;
    }

    this.loggerService.setContext(LoggingInterceptor.name);
    this.loggerService.info(
      `开始...\n ${req.method} 请求地址: ${req.originalUrl} 请求IP: ${
        req.ip
      }\n 请求参数: ${JSON.stringify(params)}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      map((data: any) => {
        const logFormat = `响应内容: ${JSON.stringify(
          data,
        )}\n结束... ${Chalk.hex('#e4e700')(
          '耗时: ' + (Date.now() - now) + 'ms',
        )}`;
        this.loggerService.http(res.statusCode, logFormat);
        return data;
      }),
    );
  }
}
