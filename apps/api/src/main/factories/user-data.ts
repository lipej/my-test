import { UserDataUseCase } from '@app/use-cases/user-data';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserDataController } from '@presentation/controllers/user-data';
import { PrismaClient } from '@prisma/client';

export class UserDataControllerFactory {
  static create() {
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const useCase = new UserDataUseCase(repo);
    return new UserDataController(useCase);
  }
}
