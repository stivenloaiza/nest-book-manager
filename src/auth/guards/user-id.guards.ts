
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
import { Observable } from 'rxjs';

@Injectable()
export class SpecificIdGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const idLuisa: string = this.reflector.get(
            'id_luisa',
            context.getHandler(),
        );

        const req = context.switchToHttp().getRequest();
        const user = req.user as User;

        if (idLuisa.includes(user.id)) return true;

        throw new ForbiddenException(`User need a valid id`);
    }

}
        
