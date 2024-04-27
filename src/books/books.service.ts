import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class BooksService {
  constructor (
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto, user: User) {
    // Comprobar que la fecha de publicación sea válida
    if (dto.publicationDate && new Date(dto.publicationDate) > new Date())
      throw new BadRequestException('The publication date must be less than the current date');

    try {
      // Crear y guardar en la base de datos
      const book: Book = this.bookRepository.create({ ...dto, createdBy: user.id });
      await this.bookRepository.save(book);

      const res: Book = await this.bookRepository.findOneBy({ id: book.id });
      return {
        message: 'Success',
        data: res
      };
    } catch (error) {
      throw new InternalServerErrorException('Database error: ' + error);
    }

  }

  async findAll(dto: PaginationDto) {
    const { limit = +process.env.LIMIT, page = 1 } = dto;

    // Consulta de libros con paginación
    const books: Book[] = await this.bookRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });

    // Comprobar la existencia de datos
    if (books.length === 0)
      throw new NotFoundException('Records not found in database');

    return {
      message: 'Success',
      data: books
    };
  }

  async findOne(id: string) {
    // Consultar libro por id y comprobar existencia
    const book: Book = await this.bookRepository.findOneBy({ id });
    if (!book)
      throw new NotFoundException('Book not found in database');

    return {
      message: 'Success',
      data: book
    };
  }

  async update(id: string, dto: UpdateBookDto, user: User) {
    // Comprobar la existencia de al menos un dato para actualizar
    if (Object.keys(dto).length === 0)
      throw new BadRequestException('Data is required to update');

    // Comprobar existencia del libro antes de actualizar
    const book: Book = await this.bookRepository.findOneBy({ id });
    if (!book)
      throw new NotFoundException('Book not found in database');

    try {
      // Actualizar en la base de datos
      await this.bookRepository.update(id, { ...dto, updatedBy: user.id });
      const res: Book = await this.bookRepository.findOneBy({ id });

      return {
        message: 'Success',
        data: res
      };
    } catch (error) {
      throw new InternalServerErrorException('Database error: ' + error);
    }
  }

  async remove(id: string, user: User) {
    // Consultar y comprobar existencia del libro antes de eliminar
    const book: Book = await this.bookRepository.findOneBy({ id });
    if (!book)
      throw new NotFoundException('Book not found in database');

    try {
      await this.bookRepository.softDelete(id);
      await this.bookRepository.update(id, { deletedBy: user.id });

      return {
        message: 'Success',
        data: null
      };
    } catch (error) {
      throw new InternalServerErrorException('Database error: ' + error);
    }
  }
}
