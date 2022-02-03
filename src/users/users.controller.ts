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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user-dto';
import { UpdateUserDto } from './DTO/update-user-dto';
import { UsersService } from './users.service';
import { UserDto } from './DTO/user-dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './users.entity';
// serilization in root
@Serialize(UserDto)
@Controller('auth')
// before anhy route this will run
// this will pull out the userId from session object if logged in
// find the user from DB with that userId
// set in on the request object
// which will be returned from decorator
// interceptor will run first then decorator

// this is just scopred to this controller
// but if we have some other router/controller then we have to do the same steps of import it again ..not a good way
// GOOD WAY-->use globally scoped interceptor
// then any request that comes from anywhere to our application this will handle
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  // DI
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // getting the current logged in user
  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   // if the user is signed in then userId will be on the session/cookie
  //   return this.usersService.findById(session.userId);
  // }
  @Get('/whoami')
  // @CurrentUser('who am i')
  // the value inside the decorator will be in the data in CurrentUser
  // decorator+interceptor method
  whoAmI(@CurrentUser() user: User) {
    // user is the returned value from current user decorator
    return user;
  }

  // only with Interceptor
  // whoAmI(@Request() request:Request) {
  //   // user is the returned value from current user decorator
  //   return request.currentUser;
  // }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    // console.log(body);
    // return this.usersService.createUser(body.email, body.password);
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signInUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    //  this will happen only if there is a change is session between 2 requests
    // session will change if the userId is changed,but if the userId are same then it will not set userId on session
    session.userId = user.id;

    return user;
  }

  // // Sessions
  // @Get('/colors/:color')
  // setColor(@Param('color') color: string, @Session() session: any) {
  //   session.color = color;
  // }

  // @Get('/colors')
  // getColor(@Session() session: any) {
  //   return session.color;
  // }

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
