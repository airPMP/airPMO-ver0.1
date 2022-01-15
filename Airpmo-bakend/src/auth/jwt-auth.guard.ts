import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { usersSchema } from 'src/schemas/users.schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

   
}
