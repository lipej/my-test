import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { Crypt } from '@app/protocols/crypt';

export const createUser = async (hash: string, db: PrismaClient, cryptoService: Crypt, active: boolean = false) => {
  const email = faker.internet.email();
  const password = faker.internet.password();

  const saved = await db.user.create({
    data: {
      email,
      name: faker.name.findName(),
      password: cryptoService.encrypt(password),
      username: email.split('@')[0],
      activationHash: hash,
      active
    }
  });

  return { ...saved, password };
};
