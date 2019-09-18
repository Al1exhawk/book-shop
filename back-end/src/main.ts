import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ExceptionFilter } from './common/exceptions/exception.filter';
import { ApplicationExceptionFilter } from './common/exceptions/application-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
  .setTitle('Book-Store RESTfull API')
  .setDescription('Your book store')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swaggerAPI', app, document);

  app.useGlobalFilters(new ExceptionFilter(), new ApplicationExceptionFilter());
  await app.init();
  await app.listen(3000);
}
bootstrap();
