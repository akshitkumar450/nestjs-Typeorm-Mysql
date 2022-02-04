import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // currentUser property is attached to request wheneven use signs in by the curent user interceptor
    if (!request.currentUser) {
      return false;
    }
    if (request.currentUser.admin) {
      return true;
    } else {
      return false;
    }
  }
}
