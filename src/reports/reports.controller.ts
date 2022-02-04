import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateReportDto } from './DTO/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  // to use report service class methods
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard) //for only authenticated user can access the routes
  @Post('/')
  createReport(@Body() body: CreateReportDto) {
    return this.reportsService.createReport(body);
  }
}
