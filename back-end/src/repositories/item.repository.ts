import { Model } from 'mongoose';
import { ItemDocument } from 'src/documents';
import { CreateItemModel } from 'src/models';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(
     minPrice: number,
     maxPrice: number,
     titleSearchString: string,
     itemType: string[],
     itemsId: string[],
     pageNumber: number,
     itemsPerPage: number,
     ): Promise<ItemDocument[]> {

      let regExp = /\w/ig;
      if (titleSearchString.length) {
        regExp = new RegExp(titleSearchString, 'ig' );
      }

      const items = await this.itemModel
      .find({
      // _id: {$in: itemsId},
      type: {$in: itemType},
      price: {$gte: minPrice, $lte: maxPrice},
      title: {$regex: regExp},
      })
      .skip(itemsPerPage * (pageNumber - 1))
      .limit(itemsPerPage)
      .populate('authors')
      .exec();

      return items;
  }

  async findOne(id: string): Promise<ItemDocument> {
    const item = await this.itemModel
    .findById(id)
    .populate('authors')
    .exec();

    return item;
  }

  async create(item: CreateItemModel): Promise<ItemDocument> {
    const createdItem = new this.itemModel(item);
    const newItem: ItemDocument = await createdItem.save();
    const newItemWithPopulate = await newItem.populate('authors').execPopulate();

    return newItemWithPopulate;
  }

  async update(id: string, item: CreateItemModel): Promise<ItemDocument> {
    const updItem = await this.itemModel
    .findByIdAndUpdate(id, item, { new: true })
    .populate('authors')
    .exec();

    return updItem;
  }

  async delete(id: string): Promise<ItemDocument> {
    const deletedItem = await this.itemModel
    .findByIdAndRemove(id)
    .populate('authors')
    .exec();

    return deletedItem;
  }

  async deleteAuthorFromItems(id: string) {
    const updDatedItems = await this.itemModel.
    updateMany(
       {authors: id},
       {$pull: {authors: id}},
       );

    return updDatedItems;
  }
}
