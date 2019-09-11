import { Model } from 'mongoose';
import { ItemDocument } from 'src/documents/db.data';
import { CreateItemModel } from 'src/models/item/create-item.model';
import { QueryObjectModel } from 'src/models/query-object.model';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(queryObject: QueryObjectModel): Promise<ItemDocument[]> {
      const {minPrice, maxPrice, titleSearchRegExp, itemType, itemsIdsFromSearchResult} = queryObject;

      const items = await this.itemModel
      .find({
      _id: {$in: itemsIdsFromSearchResult},
      price: {$gte: minPrice, $lte: maxPrice},
      title: {$regex: titleSearchRegExp},
      type: {$in: itemType},
      })
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
    const newItem: ItemDocument = await createdItem.save((error, createditem) => {
      createditem
      .populate('authors')
      .execPopulate();
    });

    return newItem;
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
