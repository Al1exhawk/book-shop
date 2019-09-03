import { User } from 'src/models/user.model';
import { UserService } from 'src/services/user.service';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    const user = this.userService.findOne(id);
    return user;
  }

  @Post()
  create(@Body() newUser: User): Promise<User> {
    const newuser = this.userService.create(newUser);
    return newuser;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User> {
    const deletedUser = this.userService.delete(id);
    return deletedUser;
  }

  @Put(':id')
  update(@Body() updUser: User, @Param('id') id: string): Promise<User> {
    const updatedUser = this.userService.update(id, updUser);
    return updatedUser;
  }
}
