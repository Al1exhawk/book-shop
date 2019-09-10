import { Model } from 'mongoose';
import { AuthorDocument } from 'src/documents/db.data';
import { CreateAuthorModel } from 'src/models/author/create-aurhor.model';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(): Promise<AuthorDocument[]> {
    const authors = await this.authorModel
    .find()
    .populate('items')
    .exec();

    return authors;
  }

  async findOne(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel
    .findById(id)
    .populate('items')
    .exec();

    return author;
  }

  async create(author: CreateAuthorModel): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(author);
    const newAuthor = await createdAuthor.save((error, createdauthor) => {
      createdauthor
      .populate('items')
      .execPopulate();
      });

    return newAuthor;
  }

  async update(id: string, author: CreateAuthorModel): Promise<AuthorDocument> {
    const updAuthor = await this.authorModel
    .findByIdAndUpdate(id, author, { new: true })
    .populate('items')
    .exec();

    return updAuthor;
  }

  async delete(id: string): Promise<AuthorDocument> {
    const deletetedAuthor = await this.authorModel
    .findByIdAndRemove(id)
    .populate('items')
    .exec();

    return deletetedAuthor;
  }

  async deleteItemFromAuthors(id: string) {
    const updDatedItems = await this.authorModel.
    updateMany({items: id},
       {$pull: {items: id}});

    return updDatedItems;
  }

  async findByRegExp(regExp: RegExp): Promise<any> {
    const author = await this.authorModel.findOne({firstName: { $regex: {regExp}}}, {items: 1});

    return author;
  }
}
