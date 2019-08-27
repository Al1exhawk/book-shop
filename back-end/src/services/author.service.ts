import { Injectable } from '@nestjs/common';
import { Author } from 'src/models/author.model';
import { AuthorRepository } from 'src/repositories/author.repository'

@Injectable()
export class AuthorService {
  constructor(private readonly AuthorRepository: AuthorRepository) {}

  async findAll(): Promise<Author[]> {
    const authors = this.AuthorRepository.findAll();
    return authors;
  }

  async findOne(id: String): Promise<Author> {
    const author = this.AuthorRepository.findOne( id );
    return author;
  }

  async create(author: Author): Promise<Author> {
    const newauthor = this.AuthorRepository.create(author);
    return  newauthor;
  }

  async delete(id: String): Promise<Author> {
    const deletedauthor = this.AuthorRepository.delete(id);
    return deletedauthor;
  }

  async update(id: String, author: Author): Promise<Author> {
    const updatedauthor = this.AuthorRepository.update(id, author);
    return updatedauthor;
  }
}