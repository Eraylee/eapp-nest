import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Elog } from '@/utils/elog.util';

@Injectable()
export class ElogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const statusCode = res.statusCode;
    const logFormat = `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      Request original url: ${req.originalUrl}
      Method: ${req.method}
      IP: ${req.ip}
      Status code: ${statusCode}
      Parmas: ${JSON.stringify(req.params)}
      Query: ${JSON.stringify(req.query)}
      Body: ${JSON.stringify(
        req.body,
      )} 
 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> 
    `;
    next();
    if (statusCode >= 500) {
      Elog.error(logFormat);
    } else if (statusCode >= 400) {
      Elog.warn(logFormat);
    } else {
      Elog.access(logFormat);
      Elog.log(logFormat);
    }
  }
}
