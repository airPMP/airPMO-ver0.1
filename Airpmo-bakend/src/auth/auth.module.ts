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
import { LocalStrategy } from './local.strategy'
import { OrgainizationModule } from 'src/organization/orgainization.module';
@Module({
  imports: [UsersModule,PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({
    
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '24h' },
      }),
   UserRolesModule,
   OrgainizationModule
  ],
  providers: [
    AuthService,
    JwtStrategy,
   JwtAuthGuard,
   LocalStrategy
  ],
  controllers: [UsersController, AuthController,],
  exports:[AuthService,PassportModule,LocalStrategy]
 
})
export class AuthModule {}
 
 


