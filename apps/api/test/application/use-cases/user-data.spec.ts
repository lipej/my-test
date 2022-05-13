import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { CryptCryptoService } from '@app/services/crypt';
import { createUser } from '@test/fixtures/gen-user';
import { UserDataUseCase } from '@app/use-cases/user-data';
import { InactiveUser } from '@app/errors/inactive-user';
import { UserNotFound } from '@app/errors/user-not-found';

const setup = () => {
  const db = new PrismaClient();
  const cryptoService = new CryptCryptoService('my_secret');
  const userRepository = new UserPrismaRepository(db);
  const userActive = new UserDataUseCase(userRepository);

  return { userActive, db, cryptoService };
};

describe(UserDataUseCase.name, () => {
  const { userActive: useCase, db, cryptoService } = setup();
  const validHash = cryptoService.encrypt('validHash');

  beforeEach(async () => {
    await db.user.deleteMany(); 
  });

  afterAll(async () => {
    await db.user.deleteMany();
  });

  it('should active a user', async () => {
    const { username } = await createUser(validHash, db, cryptoService, true);

    const result = await useCase.execute({
      username
    });

    expect(result?.username).toBe(username);
  });

  it('should thorow error if user is not active', async () => {
    const { username } = await createUser(validHash, db, cryptoService, false);

    const promise =  useCase.execute({
      username
    });

    await expect(promise).rejects.toThrow(new InactiveUser());
  })

  it('should thorow error if user was not found', async () => {
    const promise =  useCase.execute({
      username: 'any'
    });

    await expect(promise).rejects.toThrow(new UserNotFound());
  })

});
