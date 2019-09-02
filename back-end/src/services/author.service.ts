import { Author } from 'src/models/author.model';
import { Injectable } from '@nestjs/common';
import { CreateAuthor } from 'src/models/create-aurhor.model';
import { ItemRepository } from 'src/repositories/item.repository';
import { AuthorRepository } from 'src/repositories/author.repository';

/* {authors: {$in: [{firstName: "Hilover", lastName: "Korolenko"}]}}
 */

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Author[]> {
    const authors = this.authorRepository.findAll();

    return authors;
  }

  async findOne(id: string): Promise<Author> {
    const author = this.authorRepository.findOne( id );

    return author;
  }

  async create(author: CreateAuthor): Promise<Author> {
    const newauthor = this.authorRepository.create(author);

    return  newauthor;
  }

  async delete(id: string): Promise<Author> {
    const deletedauthor = this.authorRepository.delete(id);
    this.itemRepository.deleteAuthorFromItems(id);

    return deletedauthor;
  }

  async update(id: string, author: CreateAuthor): Promise<Author> {
    const updatedauthor = this.authorRepository.update(id, author);

    return updatedauthor;
  }
}
