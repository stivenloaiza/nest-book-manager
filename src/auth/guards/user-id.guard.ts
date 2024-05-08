import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class UserIdGuard implements CanActivate {
  constructor (private readonly jwtservice: JwtService){}
  
  async canActivate(context: ExecutionContext): Promise<boolean>  {

    const req = context.switchToHttp().getRequest();
    //console.log(req.headers.authorization);

    

    const token = this.extractTokenFromHeader(req)


    try {
      const decodedToken = await this.jwtservice.verifyAsync(token);
       
      
      const requestedUserId= req.params.id;
      

      if (decodedToken.id !== requestedUserId) {
        return false; 
      }    

      return true; 

    } catch (error) {
      console.error(error);
      return false; 
    }
    
    
    


  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
