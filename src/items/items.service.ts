import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModule: Model<Item>) {}
  async findAll(): Promise<Item[]> {
    return await this.itemModule.find();
  }
  async findOne(id: String): Promise<Item> {
    return await this.itemModule.findOne({ _id: id });
  }
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModule(item);
    return await newItem.save();
  }
  async delete(id: String): Promise<Item> {
    return await this.itemModule.findByIdAndRemove(id);
  }

  async update(id: String, item: Item): Promise<Item> {
    return await this.itemModule.findByIdAndUpdate(id, item, { new: true });
  }
}
