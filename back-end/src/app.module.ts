import { Module } from '@nestjs/common';
//Services
import { AppService } from './services/app.service';
import {  ItemService } from './services/item.service'
//Contrillers
import { ItemController } from './controllers/item.controller'
import { AppController } from './controllers/app.controller';
//Repositories
import {  ItemRepository } from './repositories/item.repository'
//Providers
import {ItemProviders} from './providers/item.providers'
import {databaseProviders} from './providers/database.providers'

@Module({  
  controllers: [AppController,ItemController],
  providers: [
    AppService,
    ItemService,
    ItemRepository,
    ...ItemProviders,
    ...databaseProviders],
})
export class AppModule {}
