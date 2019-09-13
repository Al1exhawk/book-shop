import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
// Services
import { ItemService } from 'src/services';
import { UserService } from 'src/services';
import { AuthService } from 'src/services';
import { AuthorService } from 'src/services';

// Contrillers
import { ItemController } from 'src/controllers';
import { UserController } from 'src/controllers';
import { AuthController } from 'src/controllers';
import { AuthorController } from 'src/controllers';
// Repositories
import {  ItemRepository } from 'src/repositories';
import {  UserRepository } from 'src/repositories';
import {  AuthorRepository } from 'src/repositories';
// Providers
import { ItemProviders } from 'src/common/providers';
import { UserProviders } from 'src/common/providers';
import { AuthorProviders } from 'src/common/providers';
import { DatabaseProviders } from 'src/common/providers';
// Stategies
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

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
  controllers: [ ItemController, UserController, AuthController, AuthorController],
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
