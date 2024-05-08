import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { META_ID } from '../decorators/id-protected.decorator';

@Injectable()
export class UserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated');
    }

    const requiredId = Reflect.getMetadata(META_ID, context.getHandler());
    if (!requiredId) {
      // No se ha especificado un ID protegido para esta ruta
      return true;
    }

    return user.id === requiredId;
  }
}
