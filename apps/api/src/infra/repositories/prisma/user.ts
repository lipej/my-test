import { UserRepository } from '@app/protocols/user-repository';
import { User } from 'domain/user';
import { PrismaClient, User as PrismaUser } from '@prisma/client';

export class UserPrismaRepository implements UserRepository {
  constructor(private db: PrismaClient) {}

  async create(user: User) {
    const userCreated = await this.db.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: user.password,
        username: user.username,
        activationHash: user.hash
      }
    });

    return this.generateEntity(userCreated) as User;
  }

  async findByEmail(email: string) {
    const userFromDB = await this.db.user.findUnique({ where: { email } });

    return this.generateEntity(userFromDB);
  }

  async findByUsername(username: string) {
    const userFromDB = await this.db.user.findUnique({ where: { username } });

    return this.generateEntity(userFromDB);
  }

  async active(user: User) {
    await this.db.user.update({ where: { email: user.email }, data: { active: true } });
  }

  private generateEntity = (data: PrismaUser | null) => {
    if (data) {
      const user = new User({ email: data.email, password: data.password, name: data.name, username: data.username });

      user.active = data.active;

      if (data.activationHash) {
        user.hash = data.activationHash;
      }

      return user;
    }
    return null;
  };
}
