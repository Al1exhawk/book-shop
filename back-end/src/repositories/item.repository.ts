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
     authorsId: string[],
     pageNumber: number,
     itemsPerPage: number,
     isAuthorSearchStringEmpty: boolean,
     ): Promise<ItemDocument[]> {

        let query = this.itemModel
        .find({
        type: { $in: itemType.length ? itemType : ['book', 'magazine'] },
        price: {
          $gte: minPrice && (minPrice >= 0) && (minPrice < maxPrice) ? minPrice  : 0,
          $lte: maxPrice && (maxPrice > minPrice) && (maxPrice > 0) ? maxPrice : Infinity },
        title: {
          $regex: titleSearchString.length
          ? new RegExp(titleSearchString, 'ig' )
          : /\w/ig},
        });
        if (!isAuthorSearchStringEmpty) {
          query = query.find({ authors: { $in: authorsId }});
        }
        const amountQuery = query.countDocuments();


        query = query.skip(itemsPerPage * (pageNumber - 1)).limit(itemsPerPage);

        const items = await query.populate('authors').exec();
        console.log('items', items);
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
