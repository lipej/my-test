export class MatchError extends Error {
  constructor(param: string) {
    super('Matcher error for param ' + param);
  }
}
