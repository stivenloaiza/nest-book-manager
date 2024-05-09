import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../users/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class PersonalizeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const idSofia: string= this.reflector.get(
    'id_sofia',
    context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();
    const user = request.user as User;
    if (idSofia === user.id) return true;

    
      throw new UnauthorizedException('No estás autorizado para acceder a este recurso');
    
  }
}
