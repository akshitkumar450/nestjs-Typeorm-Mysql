import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { CreateReportDto } from './DTO/create-report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  // to use report service class methods
  constructor(private reportsService: ReportsService) {}

  @UseGuards(AuthGuard) //for only authenticated user can access the routes
  @Post('/')
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.createReport(body, user);
  }
}
