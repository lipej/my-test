import { getEnv } from '@app/config';
import { CryptCryptoService } from '@app/services/crypt';
import { JwtSignToken } from '@app/services/jwt-sign-token';
import { LoginUseCase } from '@app/use-cases/login';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { LoginController } from '@presentation/controllers/login';
import { PrismaClient } from '@prisma/client';

export class LoginControllerFactory {
  static create() {
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const cryptService = new CryptCryptoService(getEnv('cryptSecret'));
    const tokenService = new JwtSignToken(getEnv('jwtSecret'));
    const useCase = new LoginUseCase(repo, cryptService, tokenService);
    return new LoginController(useCase);
  }
}
