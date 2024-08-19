import {ValidatorOptions} from "../utils";

export const options: ValidatorOptions = {
  dev: false,
  resultsType: `object`
}

export const updateValidatorOptions = (validatorOptions: ValidatorOptions) => {
  options.dev = validatorOptions.dev ?? options.dev
  options.resultsType = validatorOptions.resultsType ?? options.resultsType
}
