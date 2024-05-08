import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PrivateGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const cristian = '49f67bd5-402f-408e-802f-5f113af260c5';
    const userId = request.params._id;

    // comprobar si el ID del usuario coincide con el ID en los parámetros de la ruta
    if (cristian === userId) {
      return true;
    } else {
      return false;
    }
  }
}
