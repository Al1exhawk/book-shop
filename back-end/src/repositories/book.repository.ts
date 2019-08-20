import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { ItemDoc } from 'src/documents/db.data';


@Injectable()
export class itemRepository {
  constructor(
    @Inject('ITEM_MODEL')
    private readonly ItemModel: Model<ItemDoc>,
  ) {}

  async create(item: ItemDoc): Promise<ItemDoc> {
    const createditem = new this.ItemModel(item);
    return await createditem.save();
  }

  async findAll(): Promise<ItemDoc[]> {
    return await this.ItemModel.find().exec();
  }

  async findOne(id: String): Promise<ItemDoc> {
    return await this.ItemModel.findOne({ _id: id });
  }

  async delete(id: String): Promise<ItemDoc> {
       
    return await this.ItemModel.findByIdAndRemove(id);
  } 

  async update(id: String, item: ItemDoc): Promise<ItemDoc> {
    return await this.ItemModel.findByIdAndUpdate(id, item, { new: true });
  }
  
}