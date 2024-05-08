import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GuardmiguelGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idMiguel: string = this.reflector.get(
      'id_miguel',
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user: User = req.user as User;

    if (idMiguel === user.id) return true;

    throw new ForbiddenException(`User not authorized`);
  }
}
