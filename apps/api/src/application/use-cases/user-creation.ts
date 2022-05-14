import { getEnv } from '@app/config';
import { DuplicateUser } from '@app/errors/duplicate-user';
import { ValidationError } from '@app/errors/validation';
import { Crypt } from '@app/protocols/crypt';
import { MailSender } from '@app/protocols/mail-sender';
import { UserRepository } from '@app/protocols/user-repository';
import { ActivationEmail } from '@presentation/templates/email/activation-email';
import { User } from 'domain/user';

type Params = {
  username: string;
  password: string;
  name: string;
  email: string;
};

export class UserCreationUseCase {
  constructor(private repo: UserRepository, private cryptService: Crypt, private mailSender?: MailSender) {}

  async execute(params: Params) {
    const user = new User({ ...params });

    const isValid = user.validate('email') && user.validate('password');
    if (!isValid) throw new ValidationError();

    const alreadyHasUser =
      !(await this.repo.findByEmail(user.email)) && !(await this.repo.findByUsername(user.username));
    if (!alreadyHasUser) throw new DuplicateUser();

    const hashPass = this.cryptService.encrypt(user.password);
    const activationHash = this.cryptService.encrypt(user.username + user.email);

    const userToSave = new User({ ...user, password: hashPass });

    userToSave.hash = activationHash;

    const result = await this.repo.create(userToSave);

    if (getEnv('nodeEnv') !== 'test' && this.mailSender) {
      await this.mailSender.send(
        result.email,
        'Ative seu cadastro no myTest',
        ActivationEmail.create(
          result.name,
          `${getEnv('frontUrl')}/activation?email=${result.email}&hash=${activationHash}`
        )
      );
    }

    return result;
  }
}
