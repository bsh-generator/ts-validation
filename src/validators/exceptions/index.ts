import { LOGGER } from "../logger";

export class BshgError extends Error {
  constructor(tag?: string, err?: string) {
    super(err);
    if (tag != undefined) LOGGER.error(tag, true, err);
  }
}

export class ValidationFailedError extends BshgError {
  constructor() {
    super();
  }
}