import { applyDecorators, UseGuards,SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles_Permission_Guard } from '../roles/roles_permission.guard';

export const ROLES_PERMISSION_KEY = 'roles_permission';

export function Auth(...permission: string[]) {
  return applyDecorators(
    SetMetadata(ROLES_PERMISSION_KEY, permission),
    UseGuards(AuthGuard('jwt'), Roles_Permission_Guard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}