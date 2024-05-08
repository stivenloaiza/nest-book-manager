// specific-id.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SpecificIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { user } = request;
    console.log(request.params.id);
    
 
    const specificId = 'f76309f9-841a-43a4-9331-f9895fe89234';


    if (user && user.id === specificId) {
      return true; 
    }

   
    return false;
  }
}
