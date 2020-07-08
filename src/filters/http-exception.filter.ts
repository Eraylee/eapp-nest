import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse();
    const rawMessage = res['message'];
    let message = '';
    if (Array.isArray(rawMessage)) {
      message = rawMessage.join(',');
    } else if (typeof rawMessage === 'string') {
      message = rawMessage;
    }
    const json = {
      code: status,
      message,
      data: null,
    };
    Logger.error(
      `来源 ip:${request.ip} 请求方法:${request.method} 请求路径:${
        request.url
      } 处理失败 ${JSON.stringify(json)}`,
    );
    response.status(status).json(json);
  }
}
