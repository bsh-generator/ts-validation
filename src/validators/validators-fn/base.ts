import {
  ValidatorFnConfig,
  ValidatorFnConfigAsync,
  ValidatorFnConfigCtx,
  ValidatorFnConfigCtxAsync,
  ValidatorFnDependConfig,
  ValidatorFnDependConfigAsync,
  ValidatorFnDependConfigCtx,
  ValidatorFnDependConfigCtxAsync,
} from "../utils";

export const messageVars = {
  prefix: "%",
  value: "%val",
  name: "%name",
};

export type FnConfig = {
  message?: string | (() => string)
}

type UseCreateArgs<T> = {
  error: (value: T) => boolean,
  message: string,
  options?: FnConfig,
  args?: any[]
}

type UseDependCreateArgs<T, TO extends Record<string, any>> = {
  error: (value: T, parent: TO) => boolean,
  message: string,
  options?: FnConfig,
  args?: any[]
}

export const messageArgs = (defaultMsg: string, options?: FnConfig, ...args: any[]) => {
  const msg = message(defaultMsg, options);
  return (msg.includes("%") || args?.length > 0) ? msg.replace(/%(\d+)/g, (_, i) => args[i - 1]) : msg;
};

export const message = (message: string, options?: FnConfig) => {
  if (options && options.message) {
    return (typeof options.message == "string") ? options.message : options.message();
  }
  return message;
};

export class TypeValidator<T> {
  validations: ValidatorFnConfig<T>[] = [];
  validationsDepend: ValidatorFnDependConfig<T>[] = [];
  validationsAsync: ValidatorFnConfigAsync<T>[] = [];
  validationsDependAsync: ValidatorFnDependConfigAsync<T>[] = [];

  validationsCtx: ValidatorFnConfigCtx<T>[] = [];
  validationsDependCtx: ValidatorFnDependConfigCtx<T>[] = [];
  validationsCtxAsync: ValidatorFnConfigCtxAsync<T>[] = [];
  validationsDependCtxAsync: ValidatorFnDependConfigCtxAsync<T>[] = [];

  /**
   * add simple validation errors
   */
  onError(config: ValidatorFnConfig<T>): this;
  onError<TO>(config: ValidatorFnDependConfig<T, TO>): this;
  onError<TO = any>(config: ValidatorFnConfig<T> | ValidatorFnDependConfig<T, TO>): this {
    if ("error" in config) {
      if (config.error.length > 1) {
        this.validationsDepend.push(config as ValidatorFnDependConfig<T, TO>);
      } else {
        this.validations.push(config as ValidatorFnConfig<T>);
      }
    }

    return this;
  }

  /**
   * add simple validation errors basing on the context
   */
  onErrorCtx(config: ValidatorFnConfigCtx<T>): this;
  onErrorCtx<TO>(config: ValidatorFnDependConfigCtx<T, TO>): this;
  onErrorCtx<TO = any>(config: ValidatorFnConfigCtx<T> | ValidatorFnDependConfigCtx<T, TO>): this {
    if ("error" in config) {
      if (config.error.length > 2) {
        this.validationsDependCtx.push(config as ValidatorFnDependConfigCtx<T, TO>);
      } else {
        this.validationsCtx.push(config as ValidatorFnConfigCtx<T>);
      }
    }
    return this;
  }

  protected useCostume(arg: UseCreateArgs<T>): this;
  protected useCostume<TO extends Record<string, any>>(arg: UseDependCreateArgs<T, TO>): this;
  protected useCostume<TO extends Record<string, any>>(arg: UseCreateArgs<T> | UseDependCreateArgs<T, TO>): this {
    return this.onError({
      error: arg.error,
      message: messageArgs(arg.message, arg.options, arg.args),
    });
  }

  ////////////////////////
  /**
   * add async validation errors
   */
  onErrorAsync(config: ValidatorFnConfigAsync<T>): this;
  onErrorAsync<TO>(config: ValidatorFnDependConfigAsync<T, TO>): this;
  onErrorAsync<TO = any>(config: ValidatorFnConfigAsync<T> | ValidatorFnDependConfigAsync<T, TO>): this {
    if ("error" in config && config.error.length > 1) {
      this.validationsDependAsync.push(config as ValidatorFnDependConfigAsync<T, TO>);
    } else if ("error" in config) {
      this.validationsAsync.push(config as ValidatorFnConfigAsync<T>);
    }
    return this;
  }

  /**
   * add async validation errors basing on the context
   */
  onErrorCtxAsync(config: ValidatorFnConfigCtxAsync<T>): this;
  onErrorCtxAsync<TO>(config: ValidatorFnDependConfigCtxAsync<T, TO>): this;
  onErrorCtxAsync<TO = any>(config: ValidatorFnConfigCtxAsync<T> | ValidatorFnDependConfigCtxAsync<T, TO>): this {
    if ("error" in config && config.error.length > 2) {
      this.validationsDependCtxAsync.push(config as ValidatorFnDependConfigCtxAsync<T, TO>);
    } else if ("error" in config) {
      this.validationsCtxAsync.push(config as ValidatorFnConfigCtxAsync<T>);
    }
    return this;
  }
}

export type TypeValidatorWithContext<T, TContext extends Record<string, any>> = {
  ctx: ((ctx: TContext) => boolean) | Partial<TContext>
  validations: TypeValidator<T>
}
