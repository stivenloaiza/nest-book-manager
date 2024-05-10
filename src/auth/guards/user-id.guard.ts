
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CoderAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const hardcodedUserId = '90b3a78d-8ca7-41bf-9407-b8c191bb6868'; // Reemplaza con el ID de tu usuario quemado
    const userId = request.user.id; // ID del usuario autenticado

    // Verifica si el ID del usuario autenticado coincide con el ID del usuario quemado
    if (userId !== hardcodedUserId) {
      return false; // Si no coincide, se deniega el acceso
    }

    return true; // Si coincide, se permite el acceso
  }
}
