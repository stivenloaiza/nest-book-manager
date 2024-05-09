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
export class GuardDaniel implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idDaniel: string = this.reflector.get(
      'id_daniel',
      context.getHandler(),
    );
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    if (idDaniel === user.id) return true;

    throw new ForbiddenException(`User not authorized`);
  }
}
