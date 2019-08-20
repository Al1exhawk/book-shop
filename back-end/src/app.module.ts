import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import {ItemsService} from './services/item.service'
import {ItemsController} from './controllers/item.controller'
import { AppController } from './controllers/app.controller';
import {ItemSchema} from './models/item.schema'
import config from './config/keys';

@Module({
  imports: [    
    MongooseModule.forRoot(config.mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
    }), MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),
  ],
  controllers: [AppController,ItemsController],
  providers: [AppService,ItemsService],
})
export class AppModule {}
