import { CryptCryptoService } from '@app/services/crypt';
import { UserCreationUseCase } from '@app/use-cases/user-creation';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserCreationController } from '@presentation/controllers/user-creation';
import { PrismaClient } from '@prisma/client';

export class UserCreationControllerFactory {
  static create() {
    const secret = process.env.CRYPT_SECRET as string;
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const cryptService = new CryptCryptoService(secret);
    const useCase = new UserCreationUseCase(repo, cryptService);
    return new UserCreationController(useCase);
  }
}
