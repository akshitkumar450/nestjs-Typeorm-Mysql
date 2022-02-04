import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/users.entity';
import { ApproveReportDto } from './DTO/approve-report.dto';
import { CreateReportDto } from './DTO/create-report.dto';
import { GetEstimateDto } from './DTO/get-estimate.dto';
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

  // this will not work our currentUser interceptor will run before our adminGuard that's why our current user will not be available on request

  // for working of this we need to have middleware which will run before our adminGuard to set the currentUser
  @UseGuards(AdminGuard)
  @Patch('/:id')
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(parseInt(id), body.approved);
  }

  @Get('/')
  // http://localhost:3000/reports?make=toyota&model=corolla&lng=0&lat=0&mileage=20000&year=1980
  getEstimate(@Query() query: GetEstimateDto) {
    // console.log(query);
    return this.reportsService.createEstimate(query);
  }
}
