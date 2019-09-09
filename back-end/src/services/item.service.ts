import { Item } from 'src/models/item.model';
import { Injectable } from '@nestjs/common';
import { CreateItemModel } from 'src/models/create-item.model';
import { ItemDocument } from 'src/documents/db.data';
import { ItemRepository } from 'src/repositories/item.repository';
import { AuthorRepository } from 'src/repositories/author.repository';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authorRepository: AuthorRepository,
    ) {}

  async findAll(): Promise<Item[]> {
    const items: ItemDocument[] = await this.itemRepository.findAll();
    const itemsmodel: Item[] = items.map((item: ItemDocument) => {
      const { id, title, type , price, authors } = item;

      const itemModel: Item = {
        id,
        title,
        type,
        price,
        authors,
      };

      return itemModel;
    });

    return itemsmodel;
  }

  async findOne(itemId: string): Promise<Item> {
    const item: ItemDocument = await this.itemRepository.findOne(itemId);

    const {id, title, type, price, authors} = item;

    const itemModel: Item = {
      id,
      title,
      type,
      price,
      authors,
    };

    return itemModel;
  }

  async create(item: CreateItemModel): Promise<Item> {
    const newItem: ItemDocument = await this.itemRepository.create(item);

    const {id, title, type, price, authors} = newItem;

    const newItemModel: Item = {
      id,
      title,
      type,
      price,
      authors,
    };

    return  newItemModel;
  }

  async delete(itemId: string): Promise<Item> {
    const deletedItem: ItemDocument = await  this.itemRepository.delete(itemId);
    this.authorRepository.deleteItemFromAuthors(itemId);

    const {id, title, type, price, authors} = deletedItem;

    const deletedItemModel: Item = {
      id,
      title,
      type,
      price,
      authors,
    };

    return deletedItemModel;
  }

  async update(itemId: string, item: CreateItemModel): Promise<Item> {
    const updatedItem = await this.itemRepository.update(itemId, item);

    const {id, title, type, price, authors} = updatedItem;

    const updatedItemModel: Item = {
      id,
      title,
      type,
      price,
      authors,
    };

    return updatedItemModel;
  }
}
