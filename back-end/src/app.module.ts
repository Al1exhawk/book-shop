import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

//Services
import { ItemService } from 'src/services/item.service'
import { UserService } from 'src/services/user.sevice'
import { AuthService } from 'src/services/auth.service'
import { AuthorService } from 'src/services/author.service'
//Contrillers
import { ItemController } from 'src/controllers/item.controller'
import { UserController } from 'src/controllers/user.controller'
import { AuthController } from 'src/controllers/auth.comtroller'
import { AuthorController } from 'src/controllers/author.controller'
//Repositories
import {  ItemRepository } from 'src/repositories/item.repository'
import {  UserRepository } from 'src/repositories/user.repository'
import {  AuthorRepository } from 'src/repositories/author.repository'
//Providers
import { ItemProviders } from 'src/providers/item.providers'
import { DatabaseProviders } from 'src/providers/database.providers'
import { UserProviders } from 'src/providers/user.providers'
import { AuthorProviders } from 'src/providers/author.providers'
//Stategies
import { JwtStrategy } from 'src/strategies/jwt.strategy'
import { LocalStrategy } from 'src/strategies/local.strategy'

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
  controllers: [ ItemController, UserController, AuthController, AuthorController],
  providers: [
    ItemService,
    UserService,
    AuthService,
    AuthorService,
    JwtStrategy,
    LocalStrategy,
    ItemRepository,
    UserRepository,
    AuthorRepository,
    ...ItemProviders,
    ...UserProviders,
    ...AuthorProviders,
    ...DatabaseProviders,
  ],
})
export class AppModule {}
