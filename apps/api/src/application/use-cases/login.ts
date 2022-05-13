import { InactiveUser } from '@app/errors/inactive-user';
import { MatchError } from '@app/errors/match';
import { UserNotFound } from '@app/errors/user-not-found';
import { Crypt } from '@app/protocols/crypt';
import { SignToken } from '@app/protocols/signtoken';
import { UserRepository } from '@app/protocols/user-repository';

type Params = {
  username: string;
  password: string;
};

export class LoginUseCase {
  constructor(private repo: UserRepository, private cryptService: Crypt, private tokenService: SignToken) {}

  async execute(params: Params) {
    const user = await this.repo.findByUsername(params.username);

    if (!user) throw new UserNotFound();

    if (!user.isActive()) throw new InactiveUser();

    const passwordMatch = this.cryptService.compare(params.password, user.password);

    if (!passwordMatch) throw new MatchError('password');

    return this.tokenService.generate(user);
  }
}
