import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'aws-sdk/clients/budgets';
import { Observable } from 'rxjs';

@Injectable()
export class GuardDeibyGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idDeiby: string = this.reflector.get(
      'id_deiby',
      context.getHandler()
    )

    const req = context.switchToHttp().getRequest()
    const user = req.user

    if(idDeiby.includes(user.id)){
      return true;
    }

    throw new ForbiddenException('user not authorized')

  }
}
