import { Injectable } from '@nestjs/common';
import { Item } from 'src/models/item.model';
import { ItemRepository } from 'src/repositories/item.repository';
import { CreateItem } from 'src/models/create-item.model';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll(quary: object = {}): Promise<Item[]> {
    const items = this.itemRepository.findAll(quary);

    return items;
  }

  async findOne(id: string): Promise<Item> {
    const item = this.itemRepository.findOne(id);

    return item;
  }

  async create(item: CreateItem): Promise<Item> {
    const newItem = this.itemRepository.create(item);

    return  newItem;
  }

  async delete(id: string): Promise<Item> {
    const deletedItem =  this.itemRepository.delete(id);

    return deletedItem;
  }

  async update(id: string, item: CreateItem): Promise<Item> {
    const updatedItem = this.itemRepository.update(id, item);

    return updatedItem;
  }
}
