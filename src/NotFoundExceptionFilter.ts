import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    // here return 404
    return response.status(404).json({
      message: exception.message,
      errCode: 'not_found',
      detail: {
        url: request.url,
        method: request.method,
        body: request.body,
        params: request.params,
      },
    });
  }
}
