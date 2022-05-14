import { getEnv } from '@app/config';
import { CryptCryptoService } from '@app/services/crypt';
import { UserActiveUseCase } from '@app/use-cases/user-active';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserActiveController } from '@presentation/controllers/user-active';
import { PrismaClient } from '@prisma/client';

export class UserActiveControllerFactory {
  static create() {
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const cryptService = new CryptCryptoService(getEnv('cryptSecret'));
    const useCase = new UserActiveUseCase(repo, cryptService);
    return new UserActiveController(useCase);
  }
}
