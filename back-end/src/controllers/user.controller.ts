import {  Controller,  Get,  Put,  Post,  Delete,  Body,  Param,} from '@nestjs/common';
import { createUser } from 'src/models/create-user.model'
import { UserService } from 'src/services/user.sevice';
import { User } from 'src/models/user.model';

@Controller('users')
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
  create(@Body() newUser: createUser): Promise<User> {
    const newuser = this.UserService.create(newUser);
    return newuser;
  }

  @Delete(':id')
  delete(@Param('id') id: String): Promise<User> {
    const deletedUser = this.UserService.delete(id);
    return deletedUser;
  }

  @Put(':id')
  update(@Body() updUser: createUser, @Param('id') id: String,): Promise<User> {
    const updatedUser = this.UserService.update(id, updUser);
    return updatedUser;
  }
}