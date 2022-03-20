import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './repositories/book.repository';

@Injectable()
export class BooksService {
  constructor(private bookRepository: BookRepository) {}

  async create(createBookDto: CreateBookDto) {
    const book = await this.bookRepository.save(createBookDto);

    console.log(book);
  }
}
