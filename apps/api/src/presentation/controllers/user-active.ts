import { UserActiveUseCase } from '@app/use-cases/user-active';
import { Controller } from '@presentation/protocols';
import { GenerateResponse } from '@presentation/utils/response-generator';

export type Params = {
  email: string;
  hash: string;
};

export class UserActiveController implements Controller<Params> {
  constructor(private userActiveUseCase: UserActiveUseCase) {}

  async handle(params: Params) {
    try {
      return GenerateResponse.success(await this.userActiveUseCase.execute(params));
    } catch (err) {
      return GenerateResponse.error(err as Error);
    }
  }
}
