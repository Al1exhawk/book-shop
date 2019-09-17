import { UserModel } from 'src/models';
import { Roles } from 'src/common/decorators/role-decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/roles-guard';
import { UserService } from 'src/services';
import { CreateUserModel } from 'src/models';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller,  Get,  Put,  Post,  Delete,  Body,  Param, UseGuards } from '@nestjs/common';

@ApiUseTags('Users')
@Controller('users')
@ApiBearerAuth()
@Roles('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserModel[]> {
    const users = this.userService.findAll();
    return users;
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserModel> {
    const user = this.userService.findOne(id);
    return user;
  }

  @Post()
  create(@Body() newUser: CreateUserModel): Promise<UserModel> {
    const newuser = this.userService.create(newUser);
    return newuser;
  }

  @Put(':id')
  update(@Body() updateUser: CreateUserModel, @Param('id') id: string): Promise<UserModel> {
    const updatedUser = this.userService.update(id, updateUser);
    return updatedUser;
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<UserModel> {
    const deletedUser = this.userService.delete(id);
    return deletedUser;
  }
}
