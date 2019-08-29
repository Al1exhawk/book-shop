import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param} from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { Author } from 'src/models/author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  findAll(): Promise<Author[]> {
    const authors = this.authorService.findAll();

    return authors;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Author> {
    const author = this.authorService.findOne(id);

    return author;
  }

  @Post()
  create(@Body() newAuthor: Author): Promise<Author> {
    const newuAuthor = this.authorService.create(newAuthor);

    return newuAuthor;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Author> {
    const deletedAuthor = this.authorService.delete(id);

    return deletedAuthor;
  }

  @Put(':id')
  update(@Body() updAuthor: Author, @Param('id') id: string): Promise<Author> {
    const updatedAuthor = this.authorService.update(id, updAuthor);

    return updatedAuthor;
  }
}
