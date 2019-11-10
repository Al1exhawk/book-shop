import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MyExceptionFilter } from './common/exceptions/exception.filter';
import { ApplicationExceptionFilter } from './common/exceptions/application-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalFilters(
    new MyExceptionFilter(),
    new ApplicationExceptionFilter(),
  );

  await app.listen(80);
}
bootstrap();
