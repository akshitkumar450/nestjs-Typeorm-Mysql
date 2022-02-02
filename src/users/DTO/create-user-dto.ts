import { IsEmail, IsString } from 'class-validator';

// to validate the incoming user data by post requests
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
