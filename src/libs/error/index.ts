export class BaseError extends Error {
  status: number | undefined;

  constructor(name: string, message: string, status?: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class ServerError extends BaseError {
  constructor(message: string, status?: number) {
    super("ServerError", message, status);
  }
}

export class ApiError extends BaseError {
  constructor(message: string, status?: number) {
    super("ApiError", message, status);
  }
}
