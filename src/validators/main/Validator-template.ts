import { NestedType, ValidatorConfig, ValidatorTemplateConfig } from "../utils";
import { Validator } from "./validator";

export class ValidatorTemplate<T extends Record<string, any>, TContext extends Record<string, any>> {
  private readonly config: ValidatorTemplateConfig<T, TContext>;

  constructor(config: ValidatorTemplateConfig<T, TContext>) {
    this.config = config;
  }

  instant(): Validator<T, TContext> {
    const validatorConfig: ValidatorConfig<T, TContext> = {
      id: this.config.id,
      options: this.config.options,
      items: this.config.items,
    };

    const nested = this.config.nested;
    if (nested) {
      Object.keys(nested).forEach((it) => {
        if (validatorConfig.nested == undefined) validatorConfig.nested = {} as NestedType<T, TContext>;
        // @ts-ignore
        validatorConfig.nested[it] = nested[it as keyof typeof nested]?.instant();
      });
    }

    return new Validator<T, TContext>().config(validatorConfig);
  }

  batchValidate(...data: T[]) {
    return this.instant().batchValidate(...data);
  }

  batchValidateThrow(...data: T[]) {
    this.instant().batchValidateThrow(...data);
  }
}
