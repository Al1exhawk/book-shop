import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { CreateItemdto } from '../models/createitem.module'
import { ItemsService } from '../services/items.service';
import { Item } from '../models/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: String): Promise<Item> {
    return this.itemsService.findOne(id);
  }

  @Post()
  create(@Body() newItem: CreateItemdto): Promise<Item> {
    return this.itemsService.create(newItem);
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<Item> {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  update(
    @Body() updItem: CreateItemdto,
    @Param('id') id: String,
  ): Promise<Item> {
    return this.itemsService.update(id, updItem);
  }
}
