import { ControllerResponse } from './controller-response';

export interface Controller<T> {
  handle: (value: T) => Promise<ControllerResponse>;
}
