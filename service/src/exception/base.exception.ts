import { TResponseBase } from '../definitions/types';
import { ResponseStatusCode } from '../definitions/enums';

import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';

export class GeneralError extends Error {
  constructor(
    public readonly code: keyof typeof ResponseStatusCode,
    public readonly description?: string,
  ) {
    super();
  }
}

@Injectable()
export class GeneralExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GeneralExceptionFilter.name);

  constructor() {}

  catch(exception: GeneralError | Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();

    const errorDetail: TResponseBase<any>['status'] = {
      code: ResponseStatusCode.GUARDE_FAILED,
      message: 'Failed for some reason... Possibly an internal error',
    };

    const err = exception;

    if (err instanceof GeneralError) {
      const errorCode =
        ResponseStatusCode[err.code] ?? ResponseStatusCode.INTERNAL_ERROR;
      const errorItem = ResponseStatusCode[err.code];
      errorDetail.code = errorCode;
      errorDetail.message = err.message || err.code;
    } else {
      this.logger.error(err);
    }

    const currentTime = new Date().getTime();
    const result: TResponseBase<undefined> = {
      detail: undefined,
      status: errorDetail,
    };

    return response.status(HttpStatus.OK).json(result);
  }
}
