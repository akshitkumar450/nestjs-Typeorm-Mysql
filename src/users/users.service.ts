import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    const users = await this.userRepo.find();
    return users;
  }

  async findById(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findByEmail(email: string) {
    //find returns a array of all results even if there is single result
    const user = await this.userRepo.find({ email: email });
    // if (user.length === 0) {
    //   throw new NotFoundException('user not found');
    // }
    return user;
  }

  //   Partial<User> this will ensure that the data to be updated in having fields from User Entity (either all,some or none)
  async updateUser(id: number, attributesToUpdate: Partial<User>) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    Object.assign(user, attributesToUpdate);

    // if (attributesToUpdate.email) user.email = attributesToUpdate.email;
    // if (attributesToUpdate.password)
    //   user.password = attributesToUpdate.password;

    return this.userRepo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return this.userRepo.remove(user);
  }
}
