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
        username: user.username
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
    await this.db.user.update({ where: { username: user.username, email: user.email }, data: { active: true } });
  }

  private generateEntity = (data: PrismaUser | null) =>
    data ? new User({ email: data.email, password: data.password, name: data.name, username: data.username }) : null;
}
