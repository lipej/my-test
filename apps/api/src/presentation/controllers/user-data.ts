import { UserDataUseCase } from '@app/use-cases/user-data';
import { Controller } from '@presentation/protocols';
import { GenerateResponse } from '@presentation/utils/response-generator';

export type Params = {
  username: string;
};

export class UserDataController implements Controller<Params> {
  constructor(private userDataUseCase: UserDataUseCase) {}

  async handle(params: Params) {
    try {
      return GenerateResponse.success({ ...(await this.userDataUseCase.execute(params)), password: undefined, _hash: undefined, _active: undefined});
    } catch (err) {
      return GenerateResponse.error(err as Error);
    }
  }
}
