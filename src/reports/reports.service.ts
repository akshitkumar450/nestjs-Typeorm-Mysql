import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './DTO/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  // to use Report DB
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  createReport(reportBody: CreateReportDto, user: User) {
    const report = this.reportRepo.create(reportBody);
    // adding the current user to report
    report.user = user;
    return this.reportRepo.save(report);
  }
}
