import { Model } from 'mongoose';
import { AuthorDocument } from '../documents';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AuthorRepository {
  constructor(
    @Inject('AUTHOR_MODEL')
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async findAll(page: number, authorsPerPage: number): Promise<{pages: number, authors: AuthorDocument[]}> {
    const amount = await this.authorModel
    .find()
    .countDocuments();
    const authors = await this.authorModel
    .find()
    .populate('items')
    .skip(authorsPerPage * (page - 1))
    .limit(authorsPerPage)
    .exec();
    const pages = Math.ceil(amount / authorsPerPage);

    return { pages, authors };
  }

  async findOne(id: string): Promise<AuthorDocument> {
    const author = await this.authorModel
    .findById(id)
    .populate('items')
    .exec();

    return author;
  }

  async create(author: AuthorDocument): Promise<AuthorDocument> {
    const createdAuthor = new this.authorModel(author);
    const newAuthor = await createdAuthor.save();
    const newAuthorWithPopulate = await newAuthor
    .populate('authors')
    .execPopulate();

    return newAuthorWithPopulate;
  }

  async update(id: string, author: AuthorDocument): Promise<AuthorDocument> {
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
    updateMany(
       {items: id},
       {$pull: {items: id}},
       );

    return updDatedItems;
  }

  async findByRegExp(searchString: string): Promise<AuthorDocument[]> {
    const regExp = new RegExp(searchString, 'ig' );
    const authorItems: AuthorDocument[] = await this.authorModel.find({firstName: {$regex: regExp}});

    return authorItems;
  }
}
