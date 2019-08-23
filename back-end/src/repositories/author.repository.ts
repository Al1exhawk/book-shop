import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { AuthorDoc } from 'src/documents/db.data';


@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly AuthorModel: Model<AuthorDoc>,
  ) {}

  
  async findAll(): Promise<AuthorDoc[]> {
    const Authors = await this.AuthorModel.find();
    return Authors;
  }
  
  async findOne(id: String): Promise<AuthorDoc> {
    const Author = await this.AuthorModel.findById(id);
    return Author;
  }
  
  async create(author: AuthorDoc): Promise<AuthorDoc> {
    const createdAuthor = new this.AuthorModel(author);
    const newAuthor = await createdAuthor.save()
    return newAuthor;
  }

  async update(id: String, Author: AuthorDoc): Promise<AuthorDoc> {
    const updAuthor = await this.AuthorModel.findByIdAndUpdate(id, Author, { new: true });
    return updAuthor;
  }

  async delete(id: String): Promise<AuthorDoc> {    
    const deletetedAuthor = await this.AuthorModel.findByIdAndRemove(id);
    return deletetedAuthor;
  }
}