import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { ApproveReportDto } from './DTO/approve-report.dto';
import { CreateReportDto } from './DTO/create-report.dto';
import { ReportDto } from './DTO/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
export class ReportsController {
  // to use report service class methods
  constructor(private reportsService: ReportsService) {}

  @Serialize(ReportDto) // to show only these properties
  @UseGuards(AuthGuard) //for only authenticated user can access the routes
  @Post('/')
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.createReport(body, user);
  }

  // this will not work our current user interceptor will run before our admin guard that's why our current user will not be available on request
  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(parseInt(id), body.approved);
  }
}
