import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard, PassportModule, PassportStrategy } from '@nestjs/passport';

import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesModule } from 'src/roles/roles.module';





@Module({
  imports: [UsersModule,PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
  }),RolesModule],
  providers: [AuthService,JwtStrategy,
   JwtAuthGuard,
  ],
  controllers: [UsersController, AuthController,],
  exports:[AuthService,PassportModule]
 
 

})
export class AuthModule {}
 
 


