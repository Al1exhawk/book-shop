import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { AuthorDocument } from 'src/documents/db.data';

@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(): Promise<AuthorDocument[]> {
    const authors = await this.authorModel.find();

    return authors;
  }

  async findOne(id: String): Promise<AuthorDocument> {
    const author = await this.authorModel.findById(id);

    return author;
  }

  async create(author: AuthorDocument): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(author);
    const newAuthor = await createdAuthor.save();

    return newAuthor;
  }

  async update(id: String, Author: AuthorDocument): Promise<AuthorDocument> {
    const updAuthor = await this.authorModel.findByIdAndUpdate(id, Author, { new: true });

    return updAuthor;
  }

  async delete(id: String): Promise<AuthorDocument> {
    const deletetedAuthor = await this.authorModel.findByIdAndRemove(id);

    return deletetedAuthor;
  }
}
