import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { CreateReportDto } from './DTO/create-report.dto';
import { GetEstimateDto } from './DTO/get-estimate.dto';
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
  async changeApproval(id: number, approved: boolean) {
    const report = await this.reportRepo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    report.approved = approved;
    return this.reportRepo.save(report);
  }
  createEstimate(estimateDto: GetEstimateDto) {
    // return this.reportRepo.createQueryBuilder().select('*').getRawMany();
    return this.reportRepo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make=:make', {
        make: estimateDto.make,
      })
      .andWhere('model=:model', {
        model: estimateDto.model,
      })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng: estimateDto.lng }) //lng-something
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat: estimateDto.lat }) //lat-something
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDto.year }) //lat-something
      .orderBy('ABS(mileage-:mileage)', 'DESC')
      .setParameters({ mileage: estimateDto.mileage }) //to setting the mileage ,can't be done inside orderby fn
      .limit(3)
      .getRawOne();
  }
}
