import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { CreateUserDto } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  // DI
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // console.log(body);
    return this.usersService.createUser(body.email, body.password);
  }

  //   @Get('/')
  //   getAllUsers() {
  //     return this.usersService.findAll();
  //   }

  // for excluding the password(any fields) in response
  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  findByid(@Param('id') userId: string) {
    // console.log('2.handle is running');

    return this.usersService.findById(parseInt(userId));
  }

  @Get()
  findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch('/:id')
  updateUser(@Param('id') userId: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(parseInt(userId), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') userId: string) {
    return this.usersService.removeUser(parseInt(userId));
  }
}
