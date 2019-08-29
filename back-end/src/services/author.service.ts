import { Injectable } from '@nestjs/common';
import { Author } from 'src/models/author.model';
import { AuthorRepository } from 'src/repositories/author.repository';
import { ItemRepository } from 'src/repositories/item.repository';

/* {authors: {$in: [{firstName: "Hilover", lastName: "Korolenko"}]}}
 */

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository, private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Author[]> {
    const authors = this.authorRepository.findAll();

    return authors;
  }

  async findOne(id: string): Promise<Author> {
    const author = this.authorRepository.findOne( id );

    return author;
  }

  async create(author: Author): Promise<Author> {
    const newauthor = this.authorRepository.create(author);

    return  newauthor;
  }

  async delete(id: string): Promise<Author> {
    const deletedauthor = await this.authorRepository.delete(id);
    const {firstName, lastName} = deletedauthor;
    const i = await this.itemRepository.findAll({authors: {$in: [{firstName, lastName}]}});
    console.log(i);
    return deletedauthor;
  }

  async update(id: string, author: Author): Promise<Author> {
    const updatedauthor = this.authorRepository.update(id, author);

    return updatedauthor;
  }
}
