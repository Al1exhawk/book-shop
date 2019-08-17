import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { CreateItemdto } from '../models/createitem.module'
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  findAll(): Promise<Item[]> {
    const items = this.itemsService.findAll();
    return items;
  }

  @Get(':id')
  findOne(@Param('id') id: String): Promise<Item> {
    const item = this.itemsService.findOne(id);
    return item;
  }

  @Post()
  create(@Body() newItem: CreateItemdto): Promise<Item> {
    const newI = this.itemsService.create(newItem);
    return newI;
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<Item> {
    const deletedItem = this.itemsService.delete(id);
    return deletedItem;
  }

  @Put(':id')
  update(@Body() updItem: CreateItemdto, @Param('id') id: String,): Promise<Item> {
    const updatedItem = this.itemsService.update(id, updItem);
    return updatedItem;
  }
}
