export default class BaseError extends Error {
  status: number | undefined;

  constructor(name: string, message: string, status?: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}
