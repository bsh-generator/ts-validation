import { ValidatorResult } from "./validator-result-objects";
import { ValidatorResultInfo } from "../utils";
import { BshgError } from "../exceptions";

export class BshValidationError<TV extends Record<string, any> = any> extends BshgError {
  readonly results: ValidatorResult<TV>;

  constructor(results: ValidatorResult<TV>) {
    super();
    this.results = results;
  }
}

export class BshBatchValidationError extends BshgError {
  readonly results: ValidatorResultInfo[];

  constructor(results: ValidatorResultInfo[]) {
    super();
    this.results = results;
  }
}
