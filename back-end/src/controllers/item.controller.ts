import { Roles } from '../common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles-guard';
import { ItemService } from '../services';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateItemModel, FilterModel, QueryObjectModel, ItemModel } from '../models';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@ApiUseTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  findByQuery(@Body() queryObject: QueryObjectModel): Promise<FilterModel> {
    const items: Promise<FilterModel> = this.itemService.findAll(queryObject);

    return items;
  }

  @Post('bag')
  findbyBag(@Body() bagitems: Array<{id: string, amount: number}>): Promise<{
    items: Array<{item: ItemModel, amount: number}>,
    totalPrice: number }> {

    const bagModel =  this.itemService.findForBag(bagitems);
    return bagModel;
  }

  @ApiBearerAuth()
  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string): Promise<ItemModel> {
    const item = this.itemService.findOne(id);

    return item;
  }

  @ApiBearerAuth()
  @Post('add')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() newItem: CreateItemModel): Promise<ItemModel> {
    const newitem = this.itemService.create(newItem);

    return newitem;
  }

  @ApiBearerAuth()
  @Delete(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id') id: string): Promise<ItemModel> {
    const deletedItem = this.itemService.delete(id);

    return deletedItem;
  }

  @ApiBearerAuth()
  @Put(':id')
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Body() updateItem: CreateItemModel, @Param('id') id: string): Promise<ItemModel> {
    const updatedItem = this.itemService.update(id, updateItem);

    return updatedItem;
  }
}
