import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {
  ItemService,
  AuthorService,
  UserService,
  AuthService,
  ConfigService,
  StripeService,
} from './services';
import {
  UserController,
  AuthorController,
  ItemController,
  AuthController,
  StripeController,
} from './controllers';
import {
  ItemRepository,
  AuthorRepository,
  UserRepository,
} from './repositories';
import {
  ItemProviders,
  DatabaseProviders,
  UserProviders,
  AuthorProviders,
} from './common/providers';
import { JwtStrategy } from './common/strategies/jwt.strategy';

const config = new ConfigService();

@Module({
  imports: [
    JwtModule.register({
      secret: config.JWT_SECRET,
      signOptions: {
        expiresIn: config.EXPIRES_IN,
      },
    }),
  ],
  controllers: [
    AuthController,
    ItemController,
    UserController,
    AuthorController,
    StripeController,
  ],
  providers: [
    ItemService,
    AuthService,
    UserService,
    StripeService,
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
