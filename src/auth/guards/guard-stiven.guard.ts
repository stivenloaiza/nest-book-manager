import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class GuardStivenGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idStiven: string = this.reflector.get(
      'id_stiven',
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (idStiven === user.id) return true;

    throw new ForbiddenException(`User not authorized`);
  }
}
