import { DuplicateUser } from '@app/errors/duplicate-user';
import { InactiveUser } from '@app/errors/inactive-user';
import { MatchError } from '@app/errors/match';
import { UserNotFound } from '@app/errors/user-not-found';
import { ValidationError } from '@app/errors/validation';

export class GenerateResponse {
  static success = (data: unknown) => ({
    status: 200,
    data
  });

  static error(error: Error) {
    if (error instanceof UserNotFound) {
      return { status: 404, message: error.message };
    }

    if (
      error instanceof ValidationError ||
      error instanceof DuplicateUser ||
      error instanceof MatchError ||
      error instanceof InactiveUser
    ) {
      return {
        status: 400,
        message: error.message
      };
    }

    return { status: 500, message: error.message };
  }
}
