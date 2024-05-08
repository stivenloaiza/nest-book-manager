import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "aws-sdk/clients/budgets";

@Injectable()
export class newGuard implements CanActivate {

    constructor(private readonly reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean {

        const id = this.reflector.get<string[]>('id_thomas', context.getHandler());
        const req = context.switchToHttp().getRequest()
        const user = req.user 

        if (id == user.id) return true;

        throw new ForbiddenException('USER NOT VALIDE')

        //setmetadata
        
    }

}