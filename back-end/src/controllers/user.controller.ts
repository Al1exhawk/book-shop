import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { createUserdto } from '../models/createuser.module'
import { UserService } from '../services/user.sevice';
import { User } from '../models/user.interface';

@Controller('Users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    const Users = this.UserService.findAll();
    return Users;
  }

  @Get(':id')
  findOne(@Param('id') id: String): Promise<User> {
    const User = this.UserService.findOne(id);
    return User;
  }

  @Post()
  create(@Body() newUser: createUserdto): Promise<User> {
    const newI = this.UserService.create(newUser);
    return newI;
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<User> {
    const deletedUser = this.UserService.delete(id);
    return deletedUser;
  }

  @Put(':id')
  update(@Body() updUser: createUserdto, @Param('id') id: String,): Promise<User> {
    const updatedUser = this.UserService.update(id, updUser);
    return updatedUser;
  }
}