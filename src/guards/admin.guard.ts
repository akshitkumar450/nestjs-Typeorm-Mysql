import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // currentUser property is attached to request wheneven use signs in by the curentUser interceptor

    // but this will not work
    // bcz our adminGuard runs before the currentUser Interceptor thus request .currentUser will not be available
    // so we need a middleware which will run before adminGuard and set the currentuser on request which can be accessed by admin guard
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
