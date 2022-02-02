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
  //   to interact with db we will use userRepo bcz it is an instance of Reporsitory of User Entity
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(email: string, password: string) {
    //   create() will only creat User entity instance but will not save to db
    const user = this.userRepo.create({ email, password });
    // to save data in db use save()
    // we can directly save data to db by save({email,password})..but we should not
    //  we can have some other validation after creating the instance and then save using(typeorm hooks)
    // hooks only works on the Entity instance
    // but if we directly save then we can't have any extra validation
    return this.userRepo.save(user);
  }
}
