import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookRepository } from './repositories/book.repository';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookRepository])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
