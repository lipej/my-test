export class InactiveUser extends Error {
  constructor() {
    super('User was not active');
  }
}
