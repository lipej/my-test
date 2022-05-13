import { User } from 'domain/user';
import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserCreationUseCase } from '@app/use-cases/user-creation';
import { CryptCryptoService } from '@app/services/crypt';
import { createUser } from '@test/fixtures/gen-user';

const setup = () => {
  const db = new PrismaClient();
  const userRepository = new UserPrismaRepository(db);
  const cryptoService = new CryptCryptoService('my_secret');
  const userCreation = new UserCreationUseCase(userRepository, cryptoService);

  return { userCreation, db, cryptoService };
};

describe(UserCreationUseCase.name, () => {
  const { userCreation: useCase, db, cryptoService } = setup();

  beforeEach(async () => {
    await db.user.deleteMany();
  });
  
  afterAll(async () => {
    await db.user.deleteMany();
  });

  it('should create a new user', async () => {
    const user = new User({
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@gmail.com',
      password: 'Mypass123'
    });

    const result = await useCase.execute(user);

    expect(result).toBeInstanceOf(User);
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.password).toBe(user.password);
    expect(result.username).toBe(user.username);
    expect(result.isActive()).toBe(false);
  });

  it('should not create a user if already exist email', async () => {
    const userFromDb = await createUser('', db, cryptoService);
    const user = new User({ ...userFromDb, username: 'any' });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError();
  });

  it('should not create a user if already exist username', async () => {
    const userFromDb = await createUser('', db, cryptoService);
    const user = new User({ ...userFromDb, email: 'any@email.com' });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError();
  });

  it('should not create a user with weak password', async () => {
    const user = new User({
      name: 'Batman',
      username: 'batman',
      email: 'batman@gmail.com',
      password: 'batman123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError();
  });

  it('should not create a user with wrong email', async () => {
    const user = new User({
      name: 'Robin',
      username: 'robin',
      email: 'robin@wayne',
      password: 'Mypass123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError();
  });
});
