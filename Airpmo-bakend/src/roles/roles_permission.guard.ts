import { Injectable, CanActivate, ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class Roles_Permission_Guard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles_permission', [
      context.getHandler(),
      context.getClass(),
    ]);
    
        const request = context.switchToHttp().getRequest();
        const user = request.user;
       
        for(let i=0;i<user.roles.length;i++){
       if(user.roles[i]==='super admin'){
        return true;
       }

      }
        for(let i=0;i<user.permission.length;i++){ 
          if("ALL"===user.permission[i]){
            return true;
          }
          if(requiredRoles[0]===user.permission[i]){
          return true;
        }
        }
  }

}