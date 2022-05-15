import { InactiveUser } from '@app/errors/inactive-user';
import { UserNotFound } from '@app/errors/user-not-found';
import { UserRepository } from '@app/protocols/user-repository';
import { User } from 'domain/user';

type Params = {
  username: string;
};

export class UserDataUseCase {
  constructor(private repo: UserRepository) {}

  async execute(params: Params) {
    const user = await this.repo.findByUsername(params.username);

    if (!user) throw new UserNotFound();

    if (!user.isActive()) throw new InactiveUser();

    return user;
  }
}
