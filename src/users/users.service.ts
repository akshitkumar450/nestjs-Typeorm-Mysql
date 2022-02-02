import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  //   userRepo: Repository<User>;
  //   constructor(usersRepo: Repository<User>) {
  //     this.userRepo = usersRepo;
  //   }
  //   OR
  //   using typreorm repository
  //   to interact with db we will use userRepo bcz it is an instance of Reporsitory of User
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }
}
