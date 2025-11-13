export class EmailAreadyInUseError extends Error {
  constructor(email: string) {
    super(`The email ${email} is already in use.`);
    this.name = "EmailAreadyInUseError";
  }
}

export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User with ID ${userId} not found.`);
    this.name = "UserNotFoundError";
  }
}
