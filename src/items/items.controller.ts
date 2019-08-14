import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateItemdto } from './dto/createtem.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll(): string {
    return 'Get all items!!';
  }

  @Get(':id')
  findOne(@Param('id') id): string {
    return `item ${id}`;
  }

  @Post()
  create(@Body() newItem: CreateItemdto): string {
    return `Create item
    ${newItem.title}
    ${newItem.price}
    ${newItem.type}
    ${newItem.authors}`;
  }

  @Delete(':id')
  delete(@Param('id') id): string {
    return `delete ${id}`;
  }

  @Put(':id')
  update(@Body() updItem: CreateItemdto, @Param('id') id): string {
    return `update ${id} with
    ${updItem.title}
    ${updItem.price}
    ${updItem.type}
    ${updItem.authors}`;
  }
}
