export class ValidationError extends Error {
  constructor() {
    super('VALIDATION ERROR, verify and try again');
  }
}
