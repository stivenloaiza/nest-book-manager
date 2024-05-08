import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';

import { ApiBearerAuth } from '@nestjs/swagger';
import { SpecificIdGuard } from '../guards/userId-role.guard';

export function AuthById(...roles: ValidRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard, SpecificIdGuard), 
    ApiBearerAuth(),
  );
}
