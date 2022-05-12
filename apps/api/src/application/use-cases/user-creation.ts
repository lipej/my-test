import { UserRepository } from '@app/protocols/user-repository';
import { User } from 'domain/user';

type Params = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export class UserCreationUseCase {
  constructor(private repo: UserRepository) {}

  async execute(params: Params) {
    const user = new User({ ...params });

    const alreadyHasUser = (!await this.repo.findByEmail(user.email)) && (!await this.repo.findByUsername(user.username));
    if (!alreadyHasUser) throw new Error(`VALIDATION FAILS: Ops, seems that you already have thanana `);

    const isValid = user.validate('email') && user.validate('password');
    if (!isValid) throw new Error(`VALIDATION FAILS: Invalid Parameters, verify and try again`);

    return this.repo.create(user)
  }
}
