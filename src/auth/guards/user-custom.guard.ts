import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PersonalGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idSamuel: string = this.reflector.get(
      'id_samuel',
      context.getHandler(),
    );

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (idSamuel === user.id) return true;

    throw new ForbiddenException(`User not authorized`);
  }
}
