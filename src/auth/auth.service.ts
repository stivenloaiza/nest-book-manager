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
    const { password } = dto;

    const user: User = await this.useariosRepository.findOne({
      where: { email: dto.email.toLowerCase() },
      select: { id: true, email: true, password: true, role: true }
    });

    // Comprobar existencia
    if (!user)
      throw new NotFoundException('User not found in database');

    // Comprobar credenciales
    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Invalid email or password');

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
