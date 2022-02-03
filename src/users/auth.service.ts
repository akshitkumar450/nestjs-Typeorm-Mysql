import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// scrypt function takes callback function as argument
// to avoid callback fun we have converted to promise in line 8
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  // for using the userService methods
  constructor(private userService: UsersService) {}

  async signUp(email: string, password: string) {
    //  1) see if the email already exist
    const checkEmail = await this.userService.findByEmail(email);
    // console.log(checkEmail);
    if (checkEmail.length !== 0) {
      throw new BadRequestException('email already in use');
    }

    // 2)hash the password
    // 2a)generate salt
    const salt = randomBytes(8).toString('hex');
    //2b) hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // 2c) join the hashed result and salt together
    // hashed +salted password --> is salt.hashedpassword
    const result = salt + '.' + hash.toString('hex');

    //3) create a new user and save it to DB
    const user = await this.userService.createUser(email, result);
    // return the user
    return user;
  }

  async signIn(email: string, password: string) {
    //   finding the user with email
    // it will be an array as we are using find method on findByEmail which returns array of result
    const user = await this.userService.findByEmail(email);
    // console.log(user[0]);
    if (user.length === 0) {
      throw new NotFoundException('no user found ');
    }
    // extracting the salt and hasd from the password stored in db
    const [salt, storedHashInDb] = user[0].password.split('.');

    // hashing the given password
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // if the hashed password stored in db ===newly hashed password..then creadntials are correct else,not
    if (storedHashInDb === hash.toString('hex')) {
      return user[0];
    } else {
      throw new BadRequestException('email and password do not match');
    }
  }
}
