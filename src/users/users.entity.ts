import { Report } from 'src/reports/reports.entity';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  admin: boolean;

  // no change in user DB
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  // hooks only run we have an instance
  @AfterInsert()
  logUser() {
    // this->currently created user
    console.log('user created with id ', this.id);
  }
}
// like a schema for our database
