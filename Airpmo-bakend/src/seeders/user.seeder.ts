import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { users, ussersDocument } from 'src/schemas/users.schema';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectModel(users.name) private usersModel: Model<ussersDocument>,
  ) {}

  async seed(): Promise<any> {
    //password:admin@123
    return this.usersModel.insertMany([
      {
        FirstName: 'Airpmo',
        LastName: 'admin',
        Email: 'admin@gmail.com',
        Password:
          '$2b$10$F6o/t/i4A9sNAlQiil50s./KbZpzk1tscg1VqKlhUJVoKxkha/f5e',
      },
      {
        FirstName: 'super admin',
        LastName: 'admin',
        Email: 'superadmin@gmail.com',
        Password:
          '$2b$10$F6o/t/i4A9sNAlQiil50s./KbZpzk1tscg1VqKlhUJVoKxkha/f5e',
      },
      {
        FirstName: 'riyaz',
        LastName: 'admin',
        Email: 'riyaz@gmail.com',
        Password:
          '$2b$10$EzZLPCKucJGjYPnyTjYVSuem30AWzG8RjMUL6jNI/hRyDDCA7/GKm',
      },
      {
        FirstName: 'neeraj',
        LastName: 'admin',
        Email: 'neeraj@gmail.com',
        Password:
          '$2b$10$Vk397eZKYOnWPwaCSdBBAuHkpQMaObjr2UIizNt4DaNWO7x2KWNoS',
      },
      {
        FirstName: 'aditya',
        LastName: 'admin',
        Email: 'aditya@gmail.com',
        Password:
          '$2b$10$0cV3puFlwx/RaM6z0p18ie3LogZtixPIBS0o2WZ.GmdIq5OIlJT.W',
      },
    ]);
  }

  async drop(): Promise<any> {
    return this.usersModel.deleteMany({});
  }
}
