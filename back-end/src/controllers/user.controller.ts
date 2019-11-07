import { Roles } from '../common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles-guard';
import { UserService } from '../services';
import { CreateUserModel, UserModel, PagingModel, FilterModel, UpdateUserModel } from '../models';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findAll(@Body() pagingModel: PagingModel): Promise<FilterModel> {
    const users = this.userService.findAll(pagingModel.page, pagingModel.contentPerPage);
    return users;
  }

  @Post('confirm')
  confirmUser(@Body() t: {token: string} ) {
    const confirmedUser = this.userService.confirm(t.token);
    return confirmedUser;
  }

  @Get(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  findOne(@Param('id') id: string): Promise<UserModel> {
    const user = this.userService.findOne(id);
    return user;
  }

  @Post('add')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  create(@Body() newUser: CreateUserModel): Promise<UserModel> {
    const newuser = this.userService.create(newUser);
    return newuser;
  }

  @Put(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  update(@Body() updateUser: UpdateUserModel, @Param('id') id: string): Promise<UserModel> {
    const updatedUser = this.userService.update(id, updateUser);
    return updatedUser;
  }

  @Delete(':id')
  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  delete(@Param('id') id: string): Promise<UserModel> {
    const deletedUser = this.userService.delete(id);
    return deletedUser;
  }
}
