import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookFile } from './entities/book-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookFile])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
