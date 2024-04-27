import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto) {
    // TODO: email.toLowerCase();
    try {
      // Crear y guardar en la base de datos
      const user: User = this.userRepository.create({
        ...dto,
        role: process.env.USER_ROLE
      });
      await this.userRepository.save(user);

      const res: User = await this.userRepository.findOneBy({ id: user.id });
      return {
        message: 'Success',
        data: res,
      };
    } catch (error) {
      throw new InternalServerErrorException('Database error: ' + error);
    }
  }

  async findAll(dto: PaginationDto) {
    const { limit = +process.env.LIMIT, page = 1 } = dto;

    // Consulta de usuarios con paginación
    const users: User[] = await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    // Comprobar la existencia de datos
    if (users.length === 0)
      throw new NotFoundException('Records not found in database');

    return {
      message: 'Success',
      data: users
    };
  }

  async updateRole(id: string, role: string, user: User) {
    // Comprobar que el rol sea válido
    if (!(role in ValidRoles))
      throw new NotFoundException(`A valid role is required: ${Object.values(ValidRoles)}`);

    // Comprobar la existencia del usuario
    const userToUpdate: User = await this.userRepository.findOneBy({ id });
    if (!userToUpdate)
      throw new NotFoundException('User not found in database');

    if (userToUpdate.role === role)
      throw new BadRequestException('The user currently has this role');

    try {
      // Actualizar en la base de datos
      await this.userRepository.update(id, { role, updatedBy: user.id });

      const res: User = await this.userRepository.findOneBy({ id });
      return {
        message: 'Success',
        data: res
      };
    } catch (error) {
      throw new InternalServerErrorException('Database error: ' + error);
    }
  }
}
