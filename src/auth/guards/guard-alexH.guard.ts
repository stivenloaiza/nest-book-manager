import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class GuardAlexanderGuard implements CanActivate{
    constructor(private readonly reflector: Reflector){}
        canActivate(
            context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean>{
            const idAlexander: string = this.reflector.get(
                'id_alexHernandez',
                context.getHandler()
            )

            const req = context.switchToHttp().getRequest()
            const user = req.user

            if(idAlexander.includes(user.id)){
                return true
            }

            throw new ForbiddenException('user not authorized')
        }
    }
