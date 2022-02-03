import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// our CurrentUser decorator can't access the User service instance
// to use User service instance ,,make a interceptor to get current user and then use value produced by it in this decorator
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    //   data will be any value provided in the Decorator @CurrentUser('who am i')
    //   context argument is kind of a wrapper function around incoming request
    // some work on incomg request
    const request = context.switchToHttp().getRequest();
    // console.log(request.session.userId);
    // getting the current user userId
    // request.session.userId;
    // request .currentUser is set by currentUser interceptor
    return request.currentUser;
  },
);
