import { BadRequestException, Injectable } from '@nestjs/common';
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
    // hashed password
    const result = salt + '.' + hash.toString('hex');

    //3) create a new user and save it to DB
    const user = await this.userService.createUser(email, result);
    // return the user
    return user;
  }
  signIn() {}
}
