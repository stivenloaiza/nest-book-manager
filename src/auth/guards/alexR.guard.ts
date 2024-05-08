import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserIsMe implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate( context: ExecutionContext ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest() as Request

    if (request.headers['id_user'] === 'a357dd17-136f-4556-ac45-5200b4f9ac55') return true 

    return false
  }
}
  