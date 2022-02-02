import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
@Module({
  imports: [
    // connecting to DB
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      database: 'carsdb',
      // having all the entities (Schemas) for our app
      entities: [User, Report],
      username: 'root',
      password: '97177akshit',
      synchronize: true,
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
