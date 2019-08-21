import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ItemDoc } from 'src/documents/db.data';


@Injectable()
export class ItemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly ItemModel: Model<ItemDoc>,
  ) {}

  
  async findAll(): Promise<ItemDoc[]> {
    const items = await this.ItemModel.find();
    return items;
  }
  
  async findOne(id: String): Promise<ItemDoc> {
    const item = await this.ItemModel.findOne({ _id: id });
    return item;
  }
  
  async create(item: ItemDoc): Promise<ItemDoc> {
    const createditem = new this.ItemModel(item);
    const newItem = await createditem.save()
    return newItem;
  }

  async update(id: String, item: ItemDoc): Promise<ItemDoc> {
    const updItem = await this.ItemModel.findByIdAndUpdate(id, item, { new: true });
    return updItem;
  }

  async delete(id: String): Promise<ItemDoc> {    
    const deletetedItem = await this.ItemModel.findByIdAndRemove(id);
    return deletetedItem;
  }
}