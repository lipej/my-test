import { DuplicateUser } from '@app/errors/duplicate-user';
import { ValidationError } from '@app/errors/validation';
import { Crypt } from '@app/protocols/crypt';
import { UserRepository } from '@app/protocols/user-repository';
import { User } from 'domain/user';

type Params = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export class UserCreationUseCase {
  constructor(private repo: UserRepository, private cryptService: Crypt) {}

  async execute(params: Params) {
    const user = new User({ ...params });

    const alreadyHasUser =
      !(await this.repo.findByEmail(user.email)) && !(await this.repo.findByUsername(user.username));
    if (!alreadyHasUser) throw new DuplicateUser();

    const isValid = user.validate('email') && user.validate('password');
    if (!isValid) throw new ValidationError();

    const hashPass = this.cryptService.encrypt(user.password);
    const activationHash = this.cryptService.encrypt(user.username + user.email);

    const userToSave = new User({ ...user, password: hashPass });

    userToSave.hash = activationHash;

    return this.repo.create(user);
  }
}
