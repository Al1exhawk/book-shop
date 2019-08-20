import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Services
import { AppService } from './services/app.service';
import {  ItemService } from './services/item.service'
//Contrillers
import { ItemsController } from './controllers/item.controller'
import { AppController } from './controllers/app.controller';
//Schema
import { ItemSchema } from './models/item.schema'
import config from './config/keys';
//Repositories
import {  ItemRepository } from './repositories/item.repository'
//Providers
import {ItemProviders} from './providers/item.providers'
import {databaseProviders} from './providers/database.providers'

@Module({
  
  controllers: [AppController,ItemsController],
  providers: [
    AppService,
    ItemService,
    ItemRepository,
    ...ItemProviders,
    ...databaseProviders],
})
export class AppModule {}
