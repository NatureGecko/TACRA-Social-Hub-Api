import { Observable, map } from 'rxjs';
import { TResponseBase } from '../definitions/types';
import { ResponseStatusCode } from '../definitions/enums';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

@Injectable()
export class BaseInterceptor<T> implements NestInterceptor<
  T,
  TResponseBase<T>
> {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<TResponseBase<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          detail: data,
          status: {
            code: ResponseStatusCode.SUCCESS,
            message: 'SUCCESS',
          },
        };
      }),
    );
  }
}
