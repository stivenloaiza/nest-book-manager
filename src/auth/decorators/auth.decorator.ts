import { applyDecorators, UseGuards } from '@nestjs/common';
import { ValidRoles } from '../interfaces/valid-roles';
import { ValidId } from '../interfaces/valid-id';
import { AuthGuard } from '@nestjs/passport';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard } from '../guards/user-role.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IdProtected } from '../decorators/id-protected.decorator';
import { UserIdGuard } from '../guards/user-id.guard';

export function Auth(...rolesOrIds: (ValidRoles | ValidId)[]) {
  const roles: ValidRoles[] = rolesOrIds.filter(
    (item) => typeof item === 'number',
  ) as ValidRoles[];
  const ids: ValidId[] = rolesOrIds.filter(
    (item) => typeof item === 'string',
  ) as ValidId[];

  return applyDecorators(
    RoleProtected(...roles),
    ...ids.map((id) => IdProtected(id)),
    UseGuards(AuthGuard(), UserRoleGuard, UserIdGuard),
    ApiBearerAuth(),
  );
}
