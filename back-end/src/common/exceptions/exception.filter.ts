import { Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch(Error)
export class MyExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(500)
      .json({
        message: exception.message,
      });
  }
}
