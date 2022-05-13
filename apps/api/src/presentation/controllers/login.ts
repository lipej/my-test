import { LoginUseCase } from '@app/use-cases/login';
import { Controller } from '@presentation/protocols';
import { GenerateResponse } from '@presentation/utils/response-generator';

export type Params = {
  username: string;
  password: string;
};

export class LoginController implements Controller<Params> {
  constructor(private loginUseCase: LoginUseCase) {}

  async handle(params: Params) {
    try {
      return GenerateResponse.success(await this.loginUseCase.execute(params));
    } catch (err) {
      return GenerateResponse.error(err as Error);
    }
  }
}
