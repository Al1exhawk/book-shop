import { Author } from 'src/models/author.model';
import { Injectable } from '@nestjs/common';
import { CreateAuthor } from 'src/models/create-aurhor.model';
import { AuthorDocument } from 'src/documents/db.data';
import { ItemRepository } from 'src/repositories/item.repository';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Author[]> {
    const authors: AuthorDocument[] = await this.authorRepository.findAll();
    const authorsModel: Author[] = authors.map((item: AuthorDocument) => {
      const { id, firstName, lastName, items } = item;

      const authorModel: Author = {
        id,
        firstName,
        lastName,
        items,
      };

      return authorModel;
    });

    return authorsModel;
  }

  async findOne(authorId: string): Promise<Author> {
    const author: AuthorDocument = await this.authorRepository.findOne(authorId);
    const {id, items, firstName, lastName } = author;

    const authorModel: Author = {
      id,
      items,
      firstName,
      lastName,
    };

    return authorModel;
  }

  async create(author: CreateAuthor): Promise<Author> {
    const newauthor: AuthorDocument = await this.authorRepository.create(author);
    const {id, items, firstName, lastName } = newauthor;

    const newAuthorModel: Author = {
      id,
      items,
      firstName,
      lastName,
    };

    return  newAuthorModel;
  }

  async delete(authorId: string): Promise<Author> {
    const deletedAuthor: AuthorDocument = await this.authorRepository.delete(authorId);
    this.itemRepository.deleteAuthorFromItems(authorId);
    const {id, items, firstName, lastName } = deletedAuthor;

    const deletedAuthorModel: Author = {
      id,
      items,
      firstName,
      lastName,
    };

    return deletedAuthorModel;
  }

  async update(authorId: string, author: CreateAuthor): Promise<Author> {
    const updatedAuthor: AuthorDocument = await this.authorRepository.update(authorId, author);
    const {id, items, firstName, lastName } = updatedAuthor;

    const updatedAuthorModel: Author = {
      id,
      items,
      firstName,
      lastName,
    };

    return updatedAuthorModel;
  }
}
