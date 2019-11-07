import { Roles } from '../common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles-guard';
import { ItemService } from '../services';
import { CreateItemModel, FilterModel, QueryObjectModel, ItemModel, UpdateItemModel, BagModel } from '../models';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  findByQuery(@Body() queryObject: QueryObjectModel): Promise<FilterModel> {
    const items: Promise<FilterModel> = this.itemService.findAll(queryObject);

    return items;
  }

  @Post('bag')
  findbyBag(@Body() bagitems: Array<{id: string, amount: number}>): Promise<BagModel> {
    const bagModel =  this.itemService.findForBag(bagitems);
    return bagModel;
  }

  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string): Promise<ItemModel> {
    const item = this.itemService.findOne(id);

    return item;
  }

  @Post('add')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() newItem: CreateItemModel): Promise<ItemModel> {
    const newitem = this.itemService.create(newItem);

    return newitem;
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id') id: string): Promise<ItemModel> {
    const deletedItem = this.itemService.delete(id);

    return deletedItem;
  }

  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Body() updateItem: UpdateItemModel, @Param('id') id: string): Promise<ItemModel> {
    const updatedItem = this.itemService.update(id, updateItem);

    return updatedItem;
  }
}
