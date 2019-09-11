import { Item } from 'src/models/item.model';
import { Roles } from 'src/common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { ItemService } from 'src/services/item.service';
import { CreateItemModel } from 'src/models/item/create-item.model';
import { QueryObjectModel } from 'src/models/query-object.model';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards, Query } from '@nestjs/common';

@ApiUseTags('Items')
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  findAll(@Query() query ): Promise<Item[]> {
    const {min, max, title, author, type, page, visibleItems} = query;

    const queryObject: QueryObjectModel = {
      minPrice: min && (min >= 0) && (min < max) ? min  : 0,
      maxPrice: max && (max >= 0) && (max > min) ? max  : Infinity,
      titleSearchRegExp: title ? new RegExp(title, 'ig') : /\w/ ,
      authorSearchRegExp: author ? new RegExp(author, 'ig') : /\w/,
      itemType: type ? [type] : ['magazine', 'book'],
      pageNumber: page ? page : 1,
      itemsPerPage: visibleItems ? visibleItems : 10,
    };

    const items = this.itemService.findAll(queryObject);

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
  create(@Body() newItem: CreateItemModel): Promise<Item> {
    const newitem = this.itemService.create(newItem);

    return newitem;
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
  update(@Body() updateItem: CreateItemModel, @Param('id') id: string): Promise<Item> {
    const updatedItem = this.itemService.update(id, updateItem);

    return updatedItem;
  }
}
