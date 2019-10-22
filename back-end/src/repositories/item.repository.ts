import { Model } from 'mongoose';
import { ItemDocument } from '../documents';
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
    authorsId: string[],
    pageNumber: number,
    itemsPerPage: number,
    isAuthorSearchStringEmpty: boolean,
  ): Promise<{items: ItemDocument[]; pages: number}> {

    const query: any = {
      type: { $in: itemType && itemType.length ? itemType : ['book', 'magazine'] },
      price: {
        $gte: minPrice && minPrice >= 0  ? minPrice : 0,
      },
      title: {
        $regex: titleSearchString.length
          ? new RegExp(titleSearchString, 'ig')
          : /\w/gi,
      },
    };

    if (maxPrice && maxPrice > minPrice && maxPrice > 0) {
      query.price = {...query.price, $lte: maxPrice};
    }

    if (authorsId && !isAuthorSearchStringEmpty) {
      query.authors = { $in: authorsId };
    }

    const amount: number = await this.itemModel
      .find(query)
      .countDocuments()
      .exec();
    const items = await this.itemModel
      .find(query)
      .skip(itemsPerPage * (pageNumber - 1))
      .limit(itemsPerPage)
      .populate('authors')
      .exec();
    const pages = Math.ceil(amount / itemsPerPage);

    return { items, pages };
  }

  async findForBag(id: string[]): Promise<ItemDocument[]> {
    const items = await this.itemModel
    .find({_id: {$in: id}})
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

  async create(item: ItemDocument): Promise<ItemDocument> {
    const createdItem = new this.itemModel(item);
    const newItem: ItemDocument = await createdItem.save();
    const newItemWithPopulate = await newItem
      .populate('authors')
      .execPopulate();

    return newItemWithPopulate;
  }

  async update(id: string, item: ItemDocument): Promise<ItemDocument> {
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
    const updDatedItems = await this.itemModel.updateMany(
      { authors: id },
      { $pull: { authors: id } },
    );

    return updDatedItems;
  }
}
