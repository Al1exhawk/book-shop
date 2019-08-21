import { Module } from '@nestjs/common';
//Services
import { AppService } from './services/app.service';
import {  ItemService } from './services/item.service'
import {  UserService } from './services/user.sevice'

//Contrillers
import { ItemController } from './controllers/item.controller'
import { UserController } from './controllers/user.controller'
import { AppController } from './controllers/app.controller';
//Repositories
import {  ItemRepository } from './repositories/item.repository'
import {  UserRepository } from './repositories/user.repository'

//Providers
import {ItemProviders} from './providers/item.providers'
import {databaseProviders} from './providers/database.providers'
import {UserProviders} from './providers/user.providers'

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
