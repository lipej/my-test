export class DuplicateUser extends Error {
  constructor() {
    super('Duplicate user information');
  }
}
