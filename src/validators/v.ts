import {options} from "./options";
import {Validator, ValidatorTemplate} from "./main";
import {ValidatorConfig, ValidatorTemplateConfig} from "./utils";

export const validator = <T extends Record<string, any>, TContext extends Record<string, any> = any>(config: ValidatorConfig<T, TContext>): Validator<T, TContext> => {
  const validator = new Validator<T, TContext>();
  const _options = {...options, ...config.options}
  validator.options(_options)
  validator.config(config)
  if (_options?.dev) console.log(validator)
  return validator
}

export const template = <T extends Record<string, any>, TContext extends Record<string, any> = any>(config: ValidatorTemplateConfig<T, TContext>): ValidatorTemplate<T, TContext> => {
  return new ValidatorTemplate<T, TContext>(config)
}

export const batchValidate = <T extends Record<string, any>, TContext extends Record<string, any> = any>(template: ValidatorTemplate<T, TContext>, data: T[]) => {
  return template.batchValidate(...data)
}

export const batchValidateThrow = <T extends Record<string, any>, TContext extends Record<string, any> = any>(template: ValidatorTemplate<T, TContext>, data: T[]) => {
  template.batchValidateThrow(...data)
}

export * from './validators-fn';
export * from './configuration';
export {regex} from './utils/regex'

