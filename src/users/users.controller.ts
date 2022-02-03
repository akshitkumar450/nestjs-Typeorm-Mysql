import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { UsersService } from './users.service';
import { UserDto } from './DTO/user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { get } from 'http';

// serilization in root
@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  // DI
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    // console.log(body);
    // return this.usersService.createUser(body.email, body.password);
    return this.authService.signUp(body.email, body.password);
  }

  @Post('/signin')
  signInUser(@Body() body: CreateUserDto) {
    return this.authService.signIn(body.email, body.password);
  }

  // Sessions
  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    return session.color;
  }

  // @Get('/')
  // getAllUsers() {
  //   return this.usersService.findAll();
  // }

  // for excluding the password(any fields) in response
  // @UseInterceptors(new SerializeInterceptor(UserDto))

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
