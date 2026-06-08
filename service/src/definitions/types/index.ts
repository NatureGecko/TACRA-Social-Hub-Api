export * from './authen.type';
export * from './profile.type';

import { ResponseStatusCode } from '../enums';

export type TResponseBase<T> = {
  detail: T;
  status: {
    code: ResponseStatusCode;
    message: string;
  };
};
