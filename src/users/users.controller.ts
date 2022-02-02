import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
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
}
