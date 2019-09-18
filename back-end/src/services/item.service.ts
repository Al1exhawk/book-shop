import Item from '../documents/item/db.data';
import { Injectable } from '@nestjs/common';
import { ItemDocument } from '../documents';
import { ItemRepository, AuthorRepository } from '../repositories';
import { FilterModel, QueryObjectModel, CreateItemModel, ItemModel } from '../models';

@Injectable()
export class ItemService {
  constructor(
    private readonly itemRepository: ItemRepository,
    private readonly authorRepository: AuthorRepository,
    ) {}

  async findAll(queryObject: QueryObjectModel): Promise<FilterModel> {
    const authorsId: string[] = [];
    const isAuthorSearchStringEmpty: boolean = !queryObject.authorSearchString.length; // 0 - true, not 0 - false
    if ( !isAuthorSearchStringEmpty ) {
      const authorsSearchResult = await this.authorRepository.findByRegExp(queryObject.authorSearchString);
      authorsSearchResult.forEach((author) => {
        authorsId.push(author._id);
      });
    }

    const reposirotyResponse = await this.itemRepository.findAll(
       queryObject.minPrice,
       queryObject.maxPrice,
       queryObject.titleSearchString,
       queryObject.itemType,
       authorsId,
       queryObject.pageNumber,
       queryObject.itemsPerPage,
       isAuthorSearchStringEmpty,
      );

    const itemsModel: ItemModel[] = reposirotyResponse.items.map((item: ItemDocument) => {
      const { id, title, type , price, authors } = item;

      const itemModel: ItemModel = {
        id,
        title,
        type,
        price,
        authors,
      };

      return itemModel;
    });

    const itemFilterModel: FilterModel = {
      pages: reposirotyResponse.pages,
      content: itemsModel,
    };

    return itemFilterModel;
  }

  async findOne(itemId: string): Promise<ItemModel> {
    const item: ItemDocument = await this.itemRepository.findOne(itemId);

    const {id, title, type, price, authors} = item;

    const itemModel: ItemModel = {
      id,
      title,
      type,
      price,
      authors,
    };

    return itemModel;
  }

  async create(item: CreateItemModel): Promise<ItemModel> {
    const newItem: ItemDocument = new Item({
      title: item.title,
      price: item.price,
      type: item.type,
      authors: item.authors,
    });

    const createdItem: ItemDocument = await this.itemRepository.create(newItem);

    const {id, title, type, price, authors} = createdItem;
    const createdItemModel: ItemModel = {
      id,
      title,
      type,
      price,
      authors,
    };

    return  createdItemModel;
  }

  async delete(itemId: string): Promise<ItemModel> {
    const deletedItem: ItemDocument = await  this.itemRepository.delete(itemId);
    this.authorRepository.deleteItemFromAuthors(itemId);

    const {id, title, type, price, authors} = deletedItem;

    const deletedItemModel: ItemModel = {
      id,
      title,
      type,
      price,
      authors,
    };

    return deletedItemModel;
  }

  async update(itemId: string, item: CreateItemModel): Promise<ItemModel> {
    const newItem: ItemDocument = new Item({
      title: item.title,
      price: item.price,
      type: item.type,
      authors: item.authors,
    });

    const updatedItem = await this.itemRepository.update(itemId, newItem);

    const {id, title, type, price, authors} = updatedItem;

    const updatedItemModel: ItemModel = {
      id,
      title,
      type,
      price,
      authors,
    };

    return updatedItemModel;
  }
}
