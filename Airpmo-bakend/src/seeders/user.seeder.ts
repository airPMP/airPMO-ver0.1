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
        username: 'Airpmo',
        organization_id: 1,
        Password:
          '$2b$10$F6o/t/i4A9sNAlQiil50s./KbZpzk1tscg1VqKlhUJVoKxkha/f5e',
      },
      {
        FirstName: 'super admin',
        LastName: 'admin',
        Email: 'superadmin@gmail.com',
        username: 'superadmin',
        organization_id: 2,
        Password:
          '$2b$10$F6o/t/i4A9sNAlQiil50s./KbZpzk1tscg1VqKlhUJVoKxkha/f5e',
      },
      {
        FirstName: 'riyaz',
        LastName: 'admin',
        Email: 'riyaz@gmail.com',
        username: 'riyaz',
        organization_id: 3,
        Password:
          '$2b$10$EzZLPCKucJGjYPnyTjYVSuem30AWzG8RjMUL6jNI/hRyDDCA7/GKm',
      },
      {
        FirstName: 'neeraj',
        LastName: 'admin',
        Email: 'neeraj@gmail.com',
        username: 'neeraj',
        organization_id: 4,
        Password:
          '$2b$10$Vk397eZKYOnWPwaCSdBBAuHkpQMaObjr2UIizNt4DaNWO7x2KWNoS',
      },
      {
        FirstName: 'aditya',
        LastName: 'admin',
        Email: 'aditya@gmail.com',
        username: 'aditya',
        organization_id: 5,
        Password:
          '$2b$10$0cV3puFlwx/RaM6z0p18ie3LogZtixPIBS0o2WZ.GmdIq5OIlJT.W',
      },
      {
        FirstName: 'albanna',
        LastName: 'dubai',
        Email: 'albanna@gmail.com',
        username: 'AlbannaSuperadmin',
        Password:
          '$2b$10$mblFPyBDBzcHXNzy3BXmNuKgg521aqkv2OmnXKK211qx1tZTpspLu',
      },
      {
        FirstName: 'riyaz',
        LastName: 'dubai',
        Email: 'riyaz1@gmail.com',
        username: 'Riyashar',
        Password:
          '$2b$10$StFrJoUutGwyQHZ583eYh.1m.MoOys0u70cUBMPhXpa/Evva2FQqa',
      },
    ]);
  }

  async drop(): Promise<any> {
    return this.usersModel.deleteMany({});
  }
}
