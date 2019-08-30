import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { AuthorDocument } from 'src/documents/db.data';
import { Author } from 'src/models/author.model';
import { CreateAuthor } from 'src/models/create-aurhor.model';

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

  async findOne(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel.findById(id);

    return author;
  }

  async create(author: CreateAuthor): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(author);
    const newAuthor = await createdAuthor.save();

    return newAuthor;
  }

  async update(id: string, author: CreateAuthor): Promise<AuthorDocument> {
    const updAuthor = await this.authorModel.findByIdAndUpdate(id, author, { new: true });

    return updAuthor;
  }

  async delete(id: string): Promise<AuthorDocument> {
    const deletetedAuthor = await this.authorModel.findByIdAndRemove(id);

    return deletetedAuthor;
  }
}
