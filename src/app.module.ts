import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'dev.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get<string>('DB_HOST'),
          username: config.get<string>('DB_USERNAME'),
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, Report],
          password: config.get<string>('DB_PASSWORD'),
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // global pipe
    // {
    //   provide: APP_PIPE,
    //   useValue: new ValidationPipe({
    //     whitelist: true, // to automatically delete fields which are not mentioned in DTO from the incoming request
    //   }),
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // this will run every time when our application has any incoming requests
    // global cookie middleware
    // consumer
    //   .apply(
    //     cookieSession({
    //       keys: ['super-secret'],
    //     }),
    //   )
    //   .forRoutes('*'); //to run for every route
  }
}
