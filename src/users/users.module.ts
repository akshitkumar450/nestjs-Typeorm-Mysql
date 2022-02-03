import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
@Module({
  // creation of repository
  imports: [TypeOrmModule.forFeature([User])],
  // CurrentUserInterceptor is Injectabale Class.. so it need to be added in the providers
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  controllers: [UsersController],
})
export class UsersModule {}
