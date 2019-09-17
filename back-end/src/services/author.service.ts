import Author from 'src/documents/author/db.data';
import { Injectable } from '@nestjs/common';
import { AuthorDocument } from 'src/documents';
import { ItemRepository } from 'src/repositories';
import { AuthorRepository } from 'src/repositories';
import { CreateAuthorModel, AuthorModel } from 'src/models';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<AuthorModel[]> {
    const authors: AuthorDocument[] = await this.authorRepository.findAll();

    const authorsModel: AuthorModel[] = authors.map((item: AuthorDocument) => {
      const { id, firstName, lastName, items } = item;
      const authorModel: AuthorModel = {
        id,
        firstName,
        lastName,
        items,
      };

      return authorModel;
    });

    return authorsModel;
  }

  async findOne(authorId: string): Promise<AuthorModel> {
    const author: AuthorDocument = await this.authorRepository.findOne(authorId);
    const {id, items, firstName, lastName } = author;

    const authorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return authorModel;
  }

  async create(author: CreateAuthorModel): Promise<AuthorModel> {

    const newAuthor: AuthorDocument = new Author({
      firstName: author.firstName,
      lastName: author.lastName,
      items: author.items,
    });

    const createdAuthor: AuthorDocument = await this.authorRepository.create(newAuthor);
    const { id, items, firstName, lastName } = createdAuthor;

    const createdAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return  createdAuthorModel;
  }

  async delete(authorId: string): Promise<AuthorModel> {
    const deletedAuthor: AuthorDocument = await this.authorRepository.delete(authorId);
    this.itemRepository.deleteAuthorFromItems(authorId);
    const {id, items, firstName, lastName } = deletedAuthor;

    const deletedAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return deletedAuthorModel;
  }

  async update(authorId: string, author: CreateAuthorModel): Promise<AuthorModel> {
    const newAuthor: AuthorDocument = new Author({
      firstName: author.firstName,
      lastName: author.lastName,
      items: author.items,
    });

    const updatedAuthor: AuthorDocument = await this.authorRepository.update(authorId, newAuthor);
    const {id, items, firstName, lastName } = updatedAuthor;

    const updatedAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return updatedAuthorModel;
  }
}
