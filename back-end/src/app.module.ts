import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Services
import { ItemService, AuthorService, UserService, AuthService, ConfigService } from './services';
// Contrillers
import { UserController, AuthorController, ItemController, AuthController   } from './controllers';
// Repositories
import {  ItemRepository, AuthorRepository, UserRepository } from './repositories';
// Providers
import { ItemProviders,  DatabaseProviders, UserProviders, AuthorProviders  } from './common/providers';
// Stategies
import { JwtStrategy } from './common/strategies/jwt.strategy';

const config = new ConfigService();

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController, ItemController, UserController, AuthorController],
  providers: [
    ItemService,
    UserService,
    AuthService,
    ConfigService,
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
