import { Response } from 'express';
import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(Error)
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        message: exception.message,
      });
    } else {
      response.status(500).json({
        message: exception.message,
      });
    }
  }
}
