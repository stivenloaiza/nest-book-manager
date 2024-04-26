import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly useariosRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
    let user: User;
    const { password } = dto;

    try {
      user = await this.useariosRepository.findOne({
        where: { email: dto.email.toLowerCase() },
        select: { id: true, password: true }
      });
    } catch (error) {
      throw new InternalServerErrorException('Error en la base de datos: ' + error);
    }

    // Comprobar existencia
    if (!user)
      throw new NotFoundException('El usuario no existe en la base de datos');

    // Comprobar credenciales
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Email o contraseña inválida');

    delete user.password;

    return {
      message: 'Success',
      data: { ...user, token: this.getJwtToken({ id: user.id }) }
    };
  }

  private getJwtToken( payload: JwtPayload ) {
    return this.jwtService.sign(payload);
  }
}
