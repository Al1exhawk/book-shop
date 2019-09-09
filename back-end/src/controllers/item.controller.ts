import { Item } from 'src/models/item.model';
import { Roles } from 'src/common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { CreateItem } from 'src/models/create-item.model';
import { ItemService } from 'src/services/item.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@ApiUseTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(): Promise<Item[]> {
    const items = this.itemService.findAll();

    return items;
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string): Promise<Item> {
    const item = this.itemService.findOne(id);

    return item;
  }

  @ApiBearerAuth()
  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() newItem: CreateItem): Promise<Item> {
    const newI = this.itemService.create(newItem);

    return newI;
  }
  @ApiBearerAuth()

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id') id: string): Promise<Item> {
    const deletedItem = this.itemService.delete(id);

    return deletedItem;
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Body() updItem: CreateItem, @Param('id') id: string): Promise<Item> {
    const updatedItem = this.itemService.update(id, updItem);

    return updatedItem;
  }
}
