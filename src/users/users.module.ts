import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
@Module({
  // creation of repository
  imports: [TypeOrmModule.forFeature([User])],
  // CurrentUserInterceptor is Injectabale Class.. so it need to be added in the providers
  providers: [
    UsersService,
    AuthService,
    // {
    //   // Globally scoped interceptor
    //   useClass: CurrentUserInterceptor,
    //   provide: APP_INTERCEPTOR,
    // },
  ],
  controllers: [UsersController],
})
export class UsersModule {
  // any request to our application it will run
  configure(consume: MiddlewareConsumer) {
    consume.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
