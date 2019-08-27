import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { CreateAuthor } from 'src/models/create-author.model'
import { AuthorService } from 'src/services/author.service';
import { Author } from 'src/models/author.model';

@Controller('authors')
export class AuthorController {
  constructor(private readonly AuthorService: AuthorService) {}

  @Get()
  findAll(): Promise<Author[]> {
    const Authors = this.AuthorService.findAll();
    return Authors;
  }

  @Get(':id')
  findOne(@Param('id') id: String): Promise<Author> {
    const Author = this.AuthorService.findOne(id);
    return Author;
  }

  @Post()
  create(@Body() newAuthor: CreateAuthor): Promise<Author> {
    const newuthor = this.AuthorService.create(newAuthor);
    return newuthor;
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<Author> {
    const deletedAuthor = this.AuthorService.delete(id);
    return deletedAuthor;
  }

  @Put(':id')
  update(@Body() updAuthor: CreateAuthor, @Param('id') id: String,): Promise<Author> {
    const updatedAuthor = this.AuthorService.update(id, updAuthor);
    return updatedAuthor;
  }
}