import { getEnv } from '@app/config';
import { CryptCryptoService } from '@app/services/crypt';
import { SendgridMailSenderService } from '@app/services/sendgrid-mail-sender';
import { UserCreationUseCase } from '@app/use-cases/user-creation';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserCreationController } from '@presentation/controllers/user-creation';
import { PrismaClient } from '@prisma/client';
import sgMail from '@sendgrid/mail';

export class UserCreationControllerFactory {
  static create() {
    const db = new PrismaClient();
    const repo = new UserPrismaRepository(db);
    const cryptService = new CryptCryptoService(getEnv('cryptSecret'));
    sgMail.setApiKey(getEnv('sendgridKey'));
    const mailService = new SendgridMailSenderService(sgMail, getEnv('sendgridFrom'));
    const useCase = new UserCreationUseCase(repo, cryptService, mailService);
    return new UserCreationController(useCase);
  }
}
