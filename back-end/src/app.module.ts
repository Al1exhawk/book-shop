import { Module } from '@nestjs/common';
//Services
import { AppService } from 'src/services/app.service';
import {  ItemService } from 'src/services/item.service'
import {  UserService } from 'src/services/user.sevice'
//Contrillers
import { ItemController } from 'src/controllers/item.controller'
import { UserController } from 'src/controllers/user.controller'
import { AppController } from 'src/controllers/app.controller';
//Repositories
import {  ItemRepository } from 'src/repositories/item.repository'
import {  UserRepository } from 'src/repositories/user.repository'
//Providers
import {ItemProviders} from 'src/providers/item.providers'
import {databaseProviders} from 'src/providers/database.providers'
import {UserProviders} from 'src/providers/user.providers'

@Module({  
  controllers: [AppController,ItemController,UserController],
  providers: [
    AppService,
    ItemService,
    UserService,
    ItemRepository,
    UserRepository,
    ...ItemProviders,
    ...databaseProviders,
    ...UserProviders],
})
export class AppModule {}
