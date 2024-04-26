import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(dto: CreateUserDto) {
    let user: User, role: Role, res;

    role = await this.roleRepository.findOneBy({ name: process.env.USER_ROLE });
    if (!role)
      throw new InternalServerErrorException('Error en la asignación del rol por defecto');

    try {
      user = this.userRepository.create({ ...dto, role: role.id });
      await this.userRepository.save(user);

      res = await this.userRepository.findOneBy({ id: user.id });
    } catch (error) {
      throw new InternalServerErrorException('Error en la base de datos: ' + error);
    }

    return {
      message: 'Success',
      data: res,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
