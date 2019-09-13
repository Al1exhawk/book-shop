import { Item } from 'src/models';
import { union } from 'lodash';
import { Injectable } from '@nestjs/common';
import { ItemDocument } from 'src/documents';
import { ItemRepository } from 'src/repositories';
import { ItemFilterModel } from 'src/models';
import { CreateItemModel } from 'src/models';
import { QueryObjectModel } from 'src/models';
import { AuthorRepository } from 'src/repositories';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authorRepository: AuthorRepository,
    ) {}

  async findAll(queryObject: QueryObjectModel): Promise<ItemFilterModel> {

    const {
       minPrice,
       maxPrice,
       titleSearchString,
       itemType,
       pageNumber,
       authorSearchString,
       itemsPerPage,
       } = queryObject;

    const authorsSearchResult = await this.authorRepository.findByRegExp(authorSearchString);
    let itemsArr: string[] = [];
    authorsSearchResult.forEach((author) => {
      const itemFromSearchResult: string[] = author.items.map(item => String(item));
      itemsArr = union(itemsArr, itemFromSearchResult );
    });
    queryObject.itemsIdsFromSearchResult = itemsArr;

    const items: ItemDocument[] = await this.itemRepository.findAll(
       minPrice,
       maxPrice,
       titleSearchString,
       itemType,
       queryObject.itemsIdsFromSearchResult,
       pageNumber,
       itemsPerPage,
      );
// MAPPING
    let numberOfModels: number = 0;
    const itemsModel: Item[] = items.map((item: ItemDocument) => {
      const { id, title, type , price, authors } = item;
      ++numberOfModels;

      const itemModel: Item = {
        id,
        title,
        type,
        price,
        authors,
      };

      return itemModel;
    });

    const availableNumberOfPages: number = Math.ceil(numberOfModels / itemsPerPage);
    const itemFilterModel: ItemFilterModel = {
      pages: availableNumberOfPages,
      items: itemsModel,
    };

    return itemFilterModel;
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
