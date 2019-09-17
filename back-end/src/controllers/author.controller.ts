import { Roles } from 'src/common/decorators/role-decorator';
import { AuthorModel } from 'src/models';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { AuthorService } from 'src/services';
import { CreateAuthorModel } from 'src/models';
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
  findAll(): Promise<AuthorModel[]> {
    const authors = this.authorService.findAll();

    return authors;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<AuthorModel> {
    const author = this.authorService.findOne(id);

    return author;
  }

  @Post()
  create(@Body() newAuthor: CreateAuthorModel): Promise<AuthorModel> {
    const newuAuthor = this.authorService.create(newAuthor);

    return newuAuthor;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<AuthorModel> {
    const deletedAuthor = this.authorService.delete(id);

    return deletedAuthor;
  }

  @Put(':id')
  update(@Body() updateAuthor: CreateAuthorModel, @Param('id') id: string): Promise<AuthorModel> {
    const updatedAuthor = this.authorService.update(id, updateAuthor);

    return updatedAuthor;
  }
}
