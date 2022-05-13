import { MatchError } from '@app/errors/match';
import { UserNotFound } from '@app/errors/user-not-found';
import { Crypt } from '@app/protocols/crypt';
import { UserRepository } from '@app/protocols/user-repository';
import { User } from 'domain/user';

type Params = {
  hash: string;
  email: string;
};

export class UserActiveUseCase {
  constructor(private repo: UserRepository, private cryptService: Crypt) {}

  async execute(params: Params) {
    const user = await this.repo.findByEmail(params.email);

    if (!user) throw new UserNotFound();

    if (!user.hashMatch(params.hash)) {
      throw new MatchError('hash');
    }

    return await this.repo.active(user);
  }
}
