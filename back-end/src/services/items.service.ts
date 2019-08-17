import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from '../models/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModule: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    const items = await this.itemModule.find();
    return items;
  }

  async findOne(id: String): Promise<Item> {
    const item = await this.itemModule.findOne({ _id: id });
    return item;
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModule(item);
    return await newItem.save();
  }

  async delete(id: String): Promise<Item> {
    const deletedItem = await this.itemModule.findByIdAndRemove(id);
    return deletedItem;
  }

  async update(id: String, item: Item): Promise<Item> {
    const updatedItem = await this.itemModule.findByIdAndUpdate(id, item, { new: true });
    return updatedItem;
  }
}
