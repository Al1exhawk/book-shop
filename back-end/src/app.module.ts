import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

//Services
import { AppService } from 'src/services/app.service';
import { ItemService } from 'src/services/item.service'
import { UserService } from 'src/services/user.sevice'
import { AuthService } from 'src/services/auth.service'
//Contrillers
import { AppController } from 'src/controllers/app.controller';
import { ItemController } from 'src/controllers/item.controller'
import { UserController } from 'src/controllers/user.controller'
import { AuthController } from 'src/controllers/auth.comtroller'
//Repositories
import {  ItemRepository } from 'src/repositories/item.repository'
import {  UserRepository } from 'src/repositories/user.repository'
//Providers
import {ItemProviders} from 'src/providers/item.providers'
import {DatabaseProviders} from 'src/providers/database.providers'
import {UserProviders} from 'src/providers/user.providers'
//Stategies
import {JwtStrategy} from 'src/strategies/jwt.strategy'
import {LocalStrategy} from 'src/strategies/local.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '600s'
      },
    }), 
  ],  
  controllers: [AppController, ItemController, UserController, AuthController],
  providers: [
    AppService,
    ItemService,
    UserService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    ItemRepository,
    UserRepository,
    ...ItemProviders,
    ...UserProviders,
    ...DatabaseProviders,],
})
export class AppModule {}
