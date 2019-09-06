import { Item } from 'src/models/item.model';
import { Roles } from 'src/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles-guard';
import { CreateItem } from 'src/models/create-item.model';
import { ItemService } from 'src/services/item.service';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    const items = this.itemService.findAll();

    return items;
  }

  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string): Promise<Item> {
    const item = this.itemService.findOne(id);

    return item;
  }

  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() newItem: CreateItem): Promise<Item> {
    const newI = this.itemService.create(newItem);

    return newI;
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id') id: string): Promise<Item> {
    const deletedItem = this.itemService.delete(id);

    return deletedItem;
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Body() updItem: CreateItem, @Param('id') id: string): Promise<Item> {
    const updatedItem = this.itemService.update(id, updItem);

    return updatedItem;
  }
}
