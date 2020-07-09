import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Observable } from 'rxjs';
import { Eauth } from '@/utils/eauth.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const roleCode = request['user']?.roleCode;
    const url = request.url;
    const method = request.mode;
    return Eauth.checkPermission(roleCode, url, method);
  }
}
