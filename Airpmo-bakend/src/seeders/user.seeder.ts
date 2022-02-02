import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seeder} from "nestjs-seeder";
import { users, ussersDocument } from "src/schemas/users.schema";
 
@Injectable()
export class UsersSeeder implements Seeder {
    constructor(@InjectModel(users.name) private usersModel: Model<ussersDocument>){}
 
  async seed(): Promise<any> {
    //password:admin@123
    return this.usersModel.insertMany({"FirstName":"Airpmo","LastName":"admin","Email":"admin@gmail.com","Password":"$2b$10$F6o/t/i4A9sNAlQiil50s./KbZpzk1tscg1VqKlhUJVoKxkha/f5e"});
  }
 
  async drop(): Promise<any> {
    return this.usersModel.deleteMany({});
  }
}