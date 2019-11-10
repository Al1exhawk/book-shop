import Author from '../documents/author/db.data';
import { Injectable } from '@nestjs/common';
import { AuthorDocument } from '../documents';
import { ItemRepository, AuthorRepository } from '../repositories';
import {
  CreateAuthorModel,
  AuthorModel,
  FilterModel,
  UpdateAuthorModel,
} from '../models';

@Injectable()
export class AuthorService {
  constructor(
    private readonly authorRepository: AuthorRepository,
    private readonly itemRepository: ItemRepository,
  ) {}

  async findAll(page: number, authorsPerPage: number): Promise<FilterModel> {
    const reposirotyResponse = await this.authorRepository.findAll(
      page,
      authorsPerPage,
    );

    const authorsModel: AuthorModel[] = reposirotyResponse.authors.map(
      (item: AuthorDocument) => {
        const { id, firstName, lastName, items } = item;
        const authorModel: AuthorModel = {
          id,
          firstName,
          lastName,
          items,
        };

        return authorModel;
      },
    );

    const authorFilterModel: FilterModel = {
      pages: reposirotyResponse.pages,
      content: authorsModel,
    };

    return authorFilterModel;
  }

  async findOne(authorId: string): Promise<AuthorModel> {
    const author: AuthorDocument = await this.authorRepository.findOne(
      authorId,
    );
    const { id, items, firstName, lastName } = author;

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

    const createdAuthor: AuthorDocument = await this.authorRepository.create(
      newAuthor,
    );
    const { id, items, firstName, lastName } = createdAuthor;

    const createdAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return createdAuthorModel;
  }

  async delete(authorId: string): Promise<AuthorModel> {
    const deletedAuthor: AuthorDocument = await this.authorRepository.delete(
      authorId,
    );
    this.itemRepository.deleteAuthorFromItems(authorId);
    const { id, items, firstName, lastName } = deletedAuthor;

    const deletedAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return deletedAuthorModel;
  }

  async update(
    authorId: string,
    author: UpdateAuthorModel,
  ): Promise<AuthorModel> {
    const updatedAuthor: AuthorDocument = await this.authorRepository.update(
      authorId,
      author,
    );
    const { id, items, firstName, lastName } = updatedAuthor;

    const updatedAuthorModel: AuthorModel = {
      id,
      items,
      firstName,
      lastName,
    };

    return updatedAuthorModel;
  }
}
