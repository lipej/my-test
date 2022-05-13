import { User } from 'domain/user';

export interface SignToken {
  generate(user: User): string;
  validate(token: string): { username: string };
}
