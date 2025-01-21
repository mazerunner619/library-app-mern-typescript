export class UnableToSaveUserError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidUsernameOrPasswordError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class UserDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BookDoesNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LibraryCardNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class LoanRecordNotExistError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class BookAlreadyLoanedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
