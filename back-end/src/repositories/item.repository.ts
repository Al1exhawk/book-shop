import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ItemDocument } from 'src/documents/db.data';

@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly itemModel: Model<ItemDocument>,
  ) {}

  async findAll(): Promise<ItemDocument[]> {
    const items = await this.itemModel.find();
    return items;
  }

  async findOne(id: String): Promise<ItemDocument> {
    const item = await this.itemModel.findById(id);
    return item;
  }

  async create(item: ItemDocument): Promise<ItemDocument> {
    const createdItem = new this.itemModel(item);
    const newItem = await createdItem.save();
    return newItem;
  }

  async update(id: String, item: ItemDocument): Promise<ItemDocument> {
    const updItem = await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    return updItem;
  }

  async delete(id: String): Promise<ItemDocument> {
    const deletetedItem = await this.itemModel.findByIdAndRemove(id);
    return deletetedItem;
  }
}
