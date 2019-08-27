import { Injectable } from '@nestjs/common';
import { Item } from 'src/models/item.model';
import {ItemRepository} from 'src/repositories/item.repository';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(): Promise<Item[]> {
    const items = this.itemRepository.findAll();
    return items;
  }

  async findOne(id: String): Promise<Item> {
    const item = this.itemRepository.findOne( id );
    return item;
  }

  async create(item: Item): Promise<Item> {
    const newItem = this.itemRepository.create(item);
    return  newItem;
  }

  async delete(id: String): Promise<Item> {
    const deletedItem = this.itemRepository.delete(id);
    return deletedItem;
  }

  async update(id: String, item: Item): Promise<Item> {
    const updatedItem = this.itemRepository.update(id, item);
    return updatedItem;
  }
}
