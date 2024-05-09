import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    if (!validRoles) return true;
    if (validRoles.length === 0) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    if (validRoles.includes(user.role)) return true;

    throw new ForbiddenException(`User need a valid role: ${validRoles}`);
  }
}


@Injectable()
export class UserIdMatchGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userIdFromToken = this.getUserIdFromToken(request.headers.authorization);

    // Obtener el ID del usuario del endpoint, por ejemplo, desde los parámetros de la URL
    const userIdFromEndpoint = request.params;

    // Comparar los IDs
    return userIdFromToken === userIdFromEndpoint;
  }

  private getUserIdFromToken(authHeader: string): string | null {
    if (!authHeader) return null;

    const token = authHeader.replace('Bearer ', ''); // Remove 'Bearer ' prefix
    const decodedToken = this.jwtService.decode(token) as { userId: string }; // Assuming token contains userId
    return decodedToken.userId;
  }
}
