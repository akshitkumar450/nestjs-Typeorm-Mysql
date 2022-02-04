import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './DTO/create-report.dto';
import { Report } from './reports.entity';

@Injectable()
export class ReportsService {
  // to use Report DB
  constructor(
    @InjectRepository(Report) private reportRepo: Repository<Report>,
  ) {}

  createReport(reportBody: CreateReportDto) {
    const report = this.reportRepo.create(reportBody);
    return this.reportRepo.save(report);
  }
}
