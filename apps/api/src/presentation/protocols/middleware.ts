import { MiddlewareResponse } from './middleware-response';

export interface Middleware<T> {
  handle: (data: T) => Promise<MiddlewareResponse>;
}
