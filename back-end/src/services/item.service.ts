import { Item } from 'src/models/item.model';
import { Injectable } from '@nestjs/common';
import { CreateItem } from 'src/models/create-item.model';
import { ItemRepository } from 'src/repositories/item.repository';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authorRepository: AuthorRepository,
    ) {}

  async findAll(): Promise<Item[]> {
    const items = this.itemRepository.findAll();

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
    this.authorRepository.deleteItemFromAuthors(id);

    return deletedItem;
  }

  async update(id: string, item: CreateItem): Promise<Item> {
    const updatedItem = this.itemRepository.update(id, item);

    return updatedItem;
  }
}
