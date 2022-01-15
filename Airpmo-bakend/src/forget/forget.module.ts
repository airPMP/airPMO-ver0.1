import { Module } from '@nestjs/common';
import { ForgetService } from './forget.service';
import { ForgetController } from './forget.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { users, usersSchema } from 'src/schemas/users.schema';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from 'src/auth/constants';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [MailerModule.forRoot({
    // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
    // or
    transport: {
      host: 'smtp.mailtrap.io',
      secure: false,
      auth: {
        user: 'e7ad40294a2e1b',
        pass: '0a3d53e8c9771c',
      },
    },
    defaults: {
      from: '"No Reply" <support@gmail.com>',
    },

  }),
  JwtModule.register({

    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),PassportModule.register({ defaultStrategy: 'jwt' }),  UsersModule, AuthModule, MongooseModule.forFeature([{ name: users.name, schema: usersSchema }]),],
  providers: [ForgetService,JwtStrategy,JwtAuthGuard],
  controllers: [ForgetController],
  exports:[PassportModule]

})
export class ForgetModule { }
