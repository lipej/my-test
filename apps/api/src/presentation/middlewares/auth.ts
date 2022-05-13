import { SignToken } from '@app/protocols/signtoken';
import { Middleware } from '../protocols/middleware';

type Auth = {
  authorization?: string;
};

type TokenData = {
  username: string;
};

export class AuthMiddleware implements Middleware<Auth> {
  constructor(private tokenService: SignToken) {}

  async handle(data: Auth) {
    const token = data.authorization;
    if (!token) {
      return { status: 400, message: 'token not valid' };
    }

    try {
      const { username } = this.tokenService.validate(token.replace('Bearer ', ''));

      return {
        fields: {
          username
        }
      };
    } catch (err) {
      return { status: 500, message: (err as Error).message };
    }
  }
}
