import { SignToken } from '@app/protocols/signtoken';
import { User } from 'domain/user';
import * as jwt from 'jsonwebtoken';

export class JwtSignToken implements SignToken {
  constructor(private secret: string) {}

  generate(user: User) {
    return jwt.sign({ username: user.username }, this.secret, { expiresIn: '1h' });
  }

  validate(token: string) {
    try {
      const decoded = jwt.verify(token, this.secret);

      return decoded as { username: string };
    } catch (e) {
      throw new Error((e as Error).message);
    }
  }
}
