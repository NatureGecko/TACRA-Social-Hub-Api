import { TResponseBase } from '../definitions/types';
import { ResponseStatusCode } from '../definitions/enums';

import { ArgumentsHost, ExceptionFilter, HttpStatus, Injectable, Logger } from '@nestjs/common';

export class GeneralError extends Error {
  constructor(
    public readonly code: keyof typeof ResponseStatusCode,
    public readonly description?: string,
  ) {
    super(description);
  }
}

@Injectable()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  constructor() {}

  catch(exception: GeneralError | Error, host: ArgumentsHost) {
    this.logger.error('GeneralExceptionFilter: catch exception', exception);
    const context = host.switchToHttp();
    const response = context.getResponse();

    const errorDetail: TResponseBase<any>['status'] = {
      code: ResponseStatusCode.INTERNAL_ERROR,
      message: exception.message || 'Internal server error',
    };

    const err = exception;

    if (err instanceof GeneralError) {
      const errorCode = ResponseStatusCode[err.code] ?? ResponseStatusCode.INTERNAL_ERROR;
      errorDetail.code = errorCode;
      errorDetail.message = err.message || err.code;
    } else {
      this.logger.error(err);
    }

    const result: TResponseBase<undefined> = {
      detail: undefined,
      status: errorDetail,
    };

    return response.status(HttpStatus.OK).json(result);
  }
}
