const dotenv =require('dotenv') 
dotenv.config()
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { ForgetModule } from './forget/forget.module';
import { ForgetService } from './forget/forget.service';





@Module({

  imports: [MongooseModule.forRoot('mongodb://'+process.env.DB_HOST+':'+process.env.DB_PORT, {
    user:process.env.DB_USERNAME,
    pass:process.env.DB_PASSWORD,
    dbName:process.env.DATABASE,
    w: 'majority',
    retryWrites: true
  }
      ), UsersModule, AuthModule, ForgetModule, ]


})
export class AppModule {}
