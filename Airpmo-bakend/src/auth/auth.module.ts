import { Module } from '@nestjs/common';
import { UsersController } from 'src/users/users.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule} from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserRolesModule } from 'src/user-roles/user-roles.module';


@Module({
  imports: [UsersModule,PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
      }),
   UserRolesModule],
  providers: [
    AuthService,
    JwtStrategy,
   JwtAuthGuard,
  ],
  controllers: [UsersController, AuthController,],
  exports:[AuthService,PassportModule]
 
})
export class AuthModule {}
 
 


