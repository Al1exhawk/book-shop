import { Response } from 'express';
import { Catch, ArgumentsHost } from '@nestjs/common';

@Catch(Error)
export class ExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response
      .status(500)
      .json({
        message: 'Internal Server Error!',
      });
  }
}
