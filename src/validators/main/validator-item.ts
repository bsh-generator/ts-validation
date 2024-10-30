import {
  BaseValidatorFnConfig,
  ValidatorFnConfig,
  ValidatorFnConfigAsync,
  ValidatorFnConfigCtx,
  ValidatorFnConfigCtxAsync,
  ValidatorFnDependConfig,
  ValidatorFnDependConfigAsync,
  ValidatorFnDependConfigCtx,
  ValidatorFnDependConfigCtxAsync,
} from "../utils";
import { TypeValidator } from "../validators-fn";
import { message, messageVars, TypeValidatorWithContext } from "../validators-fn/base";
import { CurrentLocalize } from "../messages";
import { Validator } from "./validator";
import { ValidationFailedError } from "../exceptions";

export class ValidatorItem<T, TC extends Record<string, any>> {
  valid: boolean | undefined;
  name!: string;
  message: string | undefined;
  get!: () => T;
  set!: (value: T) => void;
  container!: () => TC;
  validator!: Validator<TC>;
  context: Record<string, any> = this.validator?.context;

  #validations?: ValidatorFnConfig<T>[];
  #validationsDepend?: ValidatorFnDependConfig<T>[];
  #validationsAsync?: ValidatorFnConfigAsync<T>[];
  #validationsDependAsync?: ValidatorFnDependConfigAsync<T>[];

  #validationsCtx?: ValidatorFnConfigCtx<T>[];
  #validationsDependCtx?: ValidatorFnDependConfigCtx<T>[];
  #validationsCtxAsync?: ValidatorFnConfigCtxAsync<T>[];
  #validationsDependCtxAsync?: ValidatorFnDependConfigCtxAsync<T>[];

  #validationsWithContext?: TypeValidatorWithContext<T, any>[];

  setValidations(value: TypeValidator<T> | TypeValidatorWithContext<T, any>[] | undefined) {
    if (value instanceof Array) {
      this.#validationsWithContext = value;
    } else if (value) {
      value = value as TypeValidator<T>;

      this.#validations = value?.validations;
      this.#validationsDepend = value?.validationsDepend;
      this.#validationsAsync = value?.validationsAsync;
      this.#validationsDependAsync = value?.validationsDependAsync;

      this.#validationsCtx = value?.validationsCtx;
      this.#validationsDependCtx = value?.validationsDependCtx;
      this.#validationsCtxAsync = value?.validationsCtxAsync;
      this.#validationsDependCtxAsync = value?.validationsDependCtxAsync;
    }
  }

  #onChange() {
    this.validator?.onChangeEvent && this.validator.onChangeEvent(this.container());
  }

  reset() {
    this.valid = undefined;
    this.message = undefined;
    this.#onChange();
  }

  markAsError(msg: string) {
    this.valid = false;
    this.message = msg
      .replace(messageVars.value, this.get() + "")
      .replace(messageVars.name, this.name);
    this.#onChange();
  }

  /**
   * @deprecated
   * replaced with `markAsError`
   * @param msg
   * @see #markAsError
   */
  error(msg: string) {
    this.markAsError(msg);
  }

  markAsValid() {
    this.valid = true;
    this.message = undefined;
    this.#onChange();
  }

  apply(value: T): { status?: boolean, err?: string } {
    this.get = () => value;
    this.validate();
    return { status: this.valid, err: this.message };
  }

  validate = () => {
    try {
      this.#validations?.forEach(it => this.#doValidations(it));
      this.#validationsDepend?.forEach(it => this.#doValidations(it));
      this.#validationsCtx?.forEach(it => this.#doValidationsCtx(it));
      this.#validationsDependCtx?.forEach(it => this.#doValidationsCtx(it));
      this.#doValidationsWithContext();
    } catch (e) {
      if (e instanceof ValidationFailedError) return;
      throw e;
    }

    this.markAsValid();
  };

  validateAsync = async () => {
    try {
      this.#validations?.forEach(it => this.#doValidations(it));
      this.#validationsDepend?.forEach(it => this.#doValidations(it));
      this.#validationsCtx?.forEach(it => this.#doValidationsCtx(it));
      this.#validationsDependCtx?.forEach(it => this.#doValidationsCtx(it));
      await Promise.all([
        ...(this.#validationsAsync?.map(async it => await this.#doValidationsAsync(it)) || []),
        ...(this.#validationsDependAsync?.map(async it => await this.#doValidationsAsync(it)) || []),
        ...(this.#validationsCtxAsync?.map(async it => await this.#doValidationsCtxAsync(it)) || []),
        ...(this.#validationsDependCtxAsync?.map(async it => await this.#doValidationsCtxAsync(it)) || []),
      ]);
      await this.#doValidationsWithContextAsync();
    } catch (e) {
      return;
    }

    this.valid = true;
    this.message = undefined;
  };

  #getMessage = (fn: BaseValidatorFnConfig) => {
    return message(CurrentLocalize.noMessage, { message: fn.message });
  };

  //////////////////////////////////////////////////////
  ////////////// DO VALIDATIONS METHOD /////////////////
  //////////////////////////////////////////////////////
  #setTheError(
    fn: ValidatorFnDependConfigCtx<T> |
      ValidatorFnConfigCtx<T> |
      ValidatorFnDependConfigCtxAsync<T> |
      ValidatorFnConfigCtxAsync<T>,
    result: boolean,
  ) {
    if (result) {
      this.markAsError(this.#getMessage(fn));
      throw new ValidationFailedError();
    }
  }

  #doValidations(fn: ValidatorFnConfig<T>): void
  #doValidations(fn: ValidatorFnDependConfig<T>): void
  #doValidations(fn: ValidatorFnDependConfig<T> | ValidatorFnConfig<T>): void {
    const result = fn.error.length > 1
      ? (fn as ValidatorFnDependConfig<T>).error(this.get(), this.container())
      : (fn as ValidatorFnConfig<T>).error(this.get());

    this.#setTheError(fn, result);
  }

  #doValidationsCtx(fn: ValidatorFnConfigCtx<T>): void
  #doValidationsCtx(fn: ValidatorFnDependConfigCtx<T>): void
  #doValidationsCtx(fn: ValidatorFnDependConfigCtx<T> | ValidatorFnConfigCtx<T>): void {
    const result = fn.error.length > 2
      ? (fn as ValidatorFnDependConfigCtx<T>).error(this.get(), this.container(), this.validator?.context)
      : (fn as ValidatorFnConfigCtx<T>).error(this.get(), this.validator?.context);

    this.#setTheError(fn, result);
  }

  async #doValidationsAsync(fn: ValidatorFnConfigAsync<T>): Promise<void>
  async #doValidationsAsync(fn: ValidatorFnDependConfigAsync<T>): Promise<void>
  async #doValidationsAsync(fn: ValidatorFnDependConfigAsync<T> | ValidatorFnConfigAsync<T>): Promise<void> {
    const result = fn.error.length > 1
      ? await (fn as ValidatorFnDependConfigAsync<T>).error(this.get(), this.container())
      : await (fn as ValidatorFnConfigAsync<T>).error(this.get());

    this.#setTheError(fn, result);
  }

  async #doValidationsCtxAsync(fn: ValidatorFnConfigCtxAsync<T>): Promise<void>
  async #doValidationsCtxAsync(fn: ValidatorFnDependConfigCtxAsync<T>): Promise<void>
  async #doValidationsCtxAsync(fn: ValidatorFnDependConfigCtxAsync<T> | ValidatorFnConfigCtxAsync<T>): Promise<void> {
    const result = fn.error.length > 2
      ? await (fn as ValidatorFnDependConfigCtxAsync<T>).error(this.get(), this.container(), this.validator?.context)
      : await (fn as ValidatorFnConfigCtxAsync<T>).error(this.get(), this.validator?.context);

    this.#setTheError(fn, result);
  }

  /////////
  #takeValidationsFromContext(val: TypeValidatorWithContext<T, any>) {
    return val.ctx == undefined ? false
      : typeof val.ctx == "function"
        ? val.ctx(this.validator.context)
        : Object.keys(val.ctx).every(key => this.validator.context[key] == (val.ctx as Record<string, any>)[key]);
  }

  #doValidationsWithContext(): void {
    this.#validationsWithContext?.forEach(val => {
      if (this.#takeValidationsFromContext(val)) {
        val.validations.validations?.forEach(it => this.#doValidationsCtx(it));
        val.validations.validationsDepend?.forEach(it => this.#doValidationsCtx(it));
        val.validations.validationsCtx?.forEach(it => this.#doValidationsCtx(it));
        val.validations.validationsDependCtx?.forEach(it => this.#doValidationsCtx(it));
      }
    });
  }

  async #doValidationsWithContextAsync(): Promise<void> {
    if (this.#validationsWithContext) {
      for (let val of this.#validationsWithContext) {
        if (this.#takeValidationsFromContext(val)) {
          val.validations.validations?.forEach(it => this.#doValidations(it));
          val.validations.validationsDepend?.forEach(it => this.#doValidations(it));
          val.validations.validationsCtx?.forEach(it => this.#doValidationsCtx(it));
          val.validations.validationsDependCtx?.forEach(it => this.#doValidationsCtx(it));
          await Promise.all([
            ...(val.validations.validationsAsync?.map(async it => await this.#doValidationsAsync(it)) || []),
            ...(val.validations.validationsDependAsync?.map(async it => await this.#doValidationsAsync(it)) || []),
            ...(val.validations.validationsCtxAsync?.map(async it => await this.#doValidationsCtxAsync(it)) || []),
            ...(val.validations.validationsDependCtxAsync?.map(async it => await this.#doValidationsCtxAsync(it)) || []),
          ]);
        }
      }
    }
  }
}
