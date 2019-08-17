import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';
import {ItemsService} from './services/items.service'
import {ItemsController} from './controllers/items.controller'
import {ItemSchema} from './items/schemas/item.schema'

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot(config.mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }), MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])
  ],
  controllers: [AppController,ItemsController],
  providers: [AppService,ItemsService],
})
export class AppModule {}
