import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Services
import { ItemService, AuthorService, UserService, AuthService } from './services';
// Contrillers
import { UserController, AuthorController, ItemController, AuthController   } from './controllers';
// Repositories
import {  ItemRepository, AuthorRepository, UserRepository } from './repositories';
// Providers
import { ItemProviders,  DatabaseProviders, UserProviders, AuthorProviders  } from './common/providers';
// Stategies
import { JwtStrategy } from './common/strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController, ItemController, UserController, AuthorController],
  providers: [
    ItemService,
    UserService,
    AuthService,
    AuthorService,
    JwtStrategy,
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
