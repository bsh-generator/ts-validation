import { ValidatorOptions } from "../utils";
import { RegexType, updateRegex } from "../utils/regex";
import { updateValidatorOptions } from "../options";
import { changeLocal, LocalType } from "../messages";

type LibConfig = {
  validatorOptions?: ValidatorOptions,
  regex?: Partial<RegexType>,
  local?: LocalType
}

export const configure = (config: LibConfig) => {
  config.validatorOptions && updateValidatorOptions(config.validatorOptions);
  config.regex && updateRegex(config.regex);
  config.local && changeLocal(config.local);
};
