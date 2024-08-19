import {ValidatorResult} from "./validator-result-objects"
import {ValidatorResultInfo} from "../utils";

export class BshValidationError<TV = any> extends Error {
  readonly results: ValidatorResult<TV>

  constructor(results: ValidatorResult<TV>) {
    super()
    this.results = results
  }
}

export class BshBatchValidationError extends Error {
  readonly results: ValidatorResultInfo[]

  constructor(results: ValidatorResultInfo[]) {
    super()
    this.results = results
  }
}
