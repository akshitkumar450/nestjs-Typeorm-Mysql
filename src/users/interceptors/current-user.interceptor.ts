import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  //  DI to use Userservice
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    //    context is wrapper around incoming request
    // getting logged in user from session
    const request = context.switchToHttp().getRequest();
    const userId = request.session?.userId;
    if (userId) {
      const user = await this.userService.findById(userId);
      // set the current logged in user to request so that it can be used in CurrentUser Decorator
      request.currentUser = user;
    }
    // to run actual route handler
    return next.handle();
  }
}
