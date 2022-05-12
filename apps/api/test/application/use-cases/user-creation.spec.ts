import { User } from 'domain/user';
import { PrismaClient } from '@prisma/client';
import { UserPrismaRepository } from '@infra/repositories/prisma/user';
import { UserCreationUseCase } from '@app/use-cases/user-creation';

const setup = () => {
  const db = new PrismaClient();
  const userRepository = new UserPrismaRepository(db);
  const userCreation = new UserCreationUseCase(userRepository);

  return { userCreation, db };
};

describe('userCreation.name', () => {
  const { userCreation: useCase, db } = setup();

  beforeAll(async () => {
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
    expect(result).toStrictEqual(user);
  });

  it('should not create a user if already exist email', async () => {
    const user = new User({
      name: 'New John Doe',
      username: 'johndoenew',
      email: 'johndoe@gmail.com',
      password: 'Mypass123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError()
  })

  it('should not create a user if already exist username', async () => {
    const user = new User({
      name: 'New John Doe',
      username: 'johndoe',
      email: 'johndoe@new.com',
      password: 'Mypass123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError()
  })

  it('should not create a user with weak password', async () => {
    const user = new User({
      name: 'Batman',
      username: 'batman',
      email: 'batman@gmail.com',
      password: 'batman123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError()
  })

  it('should not create a user with wrong email', async () => {
    const user = new User({
      name: 'Robin',
      username: 'robin',
      email: 'robin@wayne',
      password: 'Mypass123'
    });

    const promise = useCase.execute(user);

    await expect(promise).rejects.toThrowError()
  })
});
