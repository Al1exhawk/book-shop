import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { CreateItem } from '../models/createitem.module'
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.interface';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    const items = this.itemService.findAll();
    return items;
  }

  @Get(':id')
  findOne(@Param('id') id: String): Promise<Item> {
    const item = this.itemService.findOne(id);
    return item;
  }

  @Post()
  create(@Body() newItem: CreateItem): Promise<Item> {
    const newI = this.itemService.create(newItem);
    return newI;
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<Item> {
    const deletedItem = this.itemService.delete(id);
    return deletedItem;
  }

  @Put(':id')
  update(@Body() updItem: CreateItem, @Param('id') id: String,): Promise<Item> {
    const updatedItem = this.itemService.update(id, updItem);
    return updatedItem;
  }
}
