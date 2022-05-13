import { UserCreationUseCase } from '@app/use-cases/user-creation';
import { Controller } from '@presentation/protocols';
import { GenerateResponse } from '@presentation/utils/response-generator';

export type Params = {
  name: string
  username: string;
  password: string
  email: string
};

export class UserCreationController implements Controller<Params> {
  constructor(private userCreationUseCase: UserCreationUseCase) {}

  async handle(params: Params) {
    try {
      return GenerateResponse.success(await this.userCreationUseCase.execute(params));
    } catch (err) {
      return GenerateResponse.error(err as Error);
    }
  }
}
