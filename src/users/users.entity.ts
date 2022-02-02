import { AfterInsert, Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // hooks only run we have an instance
  @AfterInsert()
  logUser() {
    // this->currently created user
    console.log('user created with id ', this.id);
  }
}
// like a schema for our database
