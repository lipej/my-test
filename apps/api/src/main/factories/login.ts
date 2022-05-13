import { CryptCryptoService } from '@app/services/crypt';
import { JwtSignToken } from '@app/services/jwt-sign-token';
import { LoginUseCase } from '@app/use-cases/login';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { LoginController } from '@presentation/controllers/login';
import { PrismaClient } from '@prisma/client';

export class LoginControllerFactory {
  static create() {
    const crypt_secret = process.env.CRYPT_SECRET as string;
    const jwt_secret = process.env.JWT_SECRET as string;
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const cryptService = new CryptCryptoService(crypt_secret);
    const tokenService = new JwtSignToken(jwt_secret)
    const useCase = new LoginUseCase(repo, cryptService, tokenService);
    return new LoginController(useCase);
  }
}
