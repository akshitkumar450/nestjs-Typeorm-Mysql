import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './reports.entity';

@Module({
  // creation of repository
  imports: [TypeOrmModule.forFeature([Report])],
  // add the service which we want to use in providers
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
