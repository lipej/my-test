import { User } from 'domain/user';
import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserActiveUseCase } from '@app/use-cases/user-active';
import { CryptCryptoService } from '@app/services/crypt';
import { createUser } from '@test/fixtures/gen-user';
import { MatchError } from '@app/errors/match';
import { UserNotFound } from '@app/errors/user-not-found';

const setup = () => {
  const db = new PrismaClient();
  const cryptoService = new CryptCryptoService('my_secret');
  const userRepository = new UserPrismaRepository(db);
  const userActive = new UserActiveUseCase(userRepository, cryptoService);

  return { userActive, db, cryptoService };
};

describe(UserActiveUseCase.name, () => {
  const { userActive: useCase, db, cryptoService } = setup();
  const validHash = cryptoService.encrypt('validHash');

  beforeEach(async () => {
    await db.user.deleteMany();
  });

  afterAll(async () => {
    await db.user.deleteMany();
  });

  it('should active a user', async () => {
    const { email } = await createUser(validHash, db, cryptoService);

    await useCase.execute({
      email,
      hash: validHash
    });

    const userFromDb = await db.user.findUnique({ where: { email } });

    expect(userFromDb?.active).toBe(true);
  });

  it('should not active user', async () => {
    const any_wrong_hash = cryptoService.encrypt('anything');
    const { email } = await createUser(validHash, db, cryptoService);
    const promise = useCase.execute({
      email: email,
      hash: any_wrong_hash
    });

    await expect(promise).rejects.toThrow(new MatchError('hash'));

    const userFromDb = await db.user.findUnique({ where: { email } });

    expect(userFromDb?.active).toBe(false);
  });

  it('should throw not found user', async () => {
    const promise = useCase.execute({
      email: 'any-email',
      hash: ''
    });

    await expect(promise).rejects.toThrow(new UserNotFound());
  });
});
