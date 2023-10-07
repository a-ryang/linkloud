import BaseError from "./BaseError";

export default class ApiError extends BaseError {
  constructor(message: string, status?: number) {
    super("ApiError", message, status);
  }
}
