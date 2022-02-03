import { Expose } from 'class-transformer';

export class UserDto {
  // to show info from the response
  @Expose()
  id: number;

  @Expose()
  email: string;
}
