import { Roles } from 'src/common/decorators/role-decorator';
import { Author } from 'src/models/author.model';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { AuthorService } from 'src/services/author.service';
import { CreateAuthorModel } from 'src/models/author/create-aurhor.model';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@ApiUseTags('Authors')
@Controller('authors')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
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
  create(@Body() newAuthor: CreateAuthorModel): Promise<Author> {
    const newuAuthor = this.authorService.create(newAuthor);

    return newuAuthor;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Author> {
    const deletedAuthor = this.authorService.delete(id);

    return deletedAuthor;
  }

  @Put(':id')
  update(@Body() updateAuthor: CreateAuthorModel, @Param('id') id: string): Promise<Author> {
    const updatedAuthor = this.authorService.update(id, updateAuthor);

    return updatedAuthor;
  }
}
