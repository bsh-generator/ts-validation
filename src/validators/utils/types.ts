import {Validator, ValidatorTemplate} from '../main';
import {TypeValidator} from '../validators-fn';
import { ValidatorResult, ValidatorResultObjects } from "../results";
import {TypeValidatorWithContext} from "../validators-fn/base";

export type BaseValidatorFnConfig<TError = any> = {
  error: TError;
  message?: string | (() => string);
}

export type ValidatorFnConfigError<T> = (value: T) => boolean
export type ValidatorFnDependConfigError<T, TO> = (value: T, container: TO) => boolean
export type ValidatorFnConfigAsyncError<T> = (value: T) => Promise<boolean>
export type ValidatorFnDependConfigAsyncError<T, TO> = (value: T, container: TO) => Promise<boolean>

export type ValidatorFnConfigCtxError<T> = (value: T, context: any) => boolean
export type ValidatorFnDependConfigCtxError<T, TO> = (value: T, container: TO, context: any) => boolean
export type ValidatorFnConfigCtxAsyncError<T> = (value: T, context: any) => Promise<boolean>
export type ValidatorFnDependConfigCtxAsyncError<T, TO> = (value: T, container: TO, context: any) => Promise<boolean>

export type ValidatorFnConfig<T> = BaseValidatorFnConfig<ValidatorFnConfigError<T>>
export type ValidatorFnDependConfig<T, TO = any> = BaseValidatorFnConfig<ValidatorFnDependConfigError<T, TO>>
export type ValidatorFnConfigAsync<T> = BaseValidatorFnConfig<ValidatorFnConfigAsyncError<T>>
export type ValidatorFnDependConfigAsync<T, TO = any> = BaseValidatorFnConfig<ValidatorFnDependConfigAsyncError<T, TO>>

export type ValidatorFnConfigCtx<T> = BaseValidatorFnConfig<ValidatorFnConfigCtxError<T>>
export type ValidatorFnDependConfigCtx<T, TO = any> = BaseValidatorFnConfig<ValidatorFnDependConfigCtxError<T, TO>>
export type ValidatorFnConfigCtxAsync<T> = BaseValidatorFnConfig<ValidatorFnConfigCtxAsyncError<T>>
export type ValidatorFnDependConfigCtxAsync<T, TO = any> = BaseValidatorFnConfig<ValidatorFnDependConfigCtxAsyncError<T, TO>>

/////////////////
export type ValidatorResultInfo = { success: boolean, results?: ValidatorResult }
export type BatchValidatorResultInfo = { success: boolean, results: ValidatorResultInfo[] }

/////////////////
export type ValidatorOptions = {
  dev?: boolean
  resultsType?: 'array' | 'object' // TODO: remove this and replace it with more meaning way ?
}

export type SimpleType = string | number | boolean | bigint | Date

export type ItemType<T, TContext extends Record<string, any>> = {
  [K in keyof T]?: TypeValidator<T[K]> | TypeValidatorWithContext<T[K], TContext>[]
}

// Utility type to filter out simple types
type NonSimpleKeys<T> = { [K in keyof T]: T[K] extends SimpleType ? never : K; }[keyof T];
// Utility type to get values of non-simple types
type NonSimpleValues<T> = { [K in NonSimpleKeys<T>]: T[K]; };

export type NestedType<T extends Record<string, any>> = NonSimpleValues<T> extends {
  [K in keyof NonSimpleValues<T>]: Validator<NonSimpleValues<T>[K]>;
} ? { [K in NonSimpleKeys<T>]?: Validator<NonSimpleValues<T>[K]> } : never;

export type TemplateNestedType<T extends Record<string, any>, TContext extends Record<string, any>> = NonSimpleValues<T> extends {
  [K in keyof NonSimpleValues<T>]: ValidatorTemplate<NonSimpleValues<T>[K], TContext>;
} ? { [K in NonSimpleKeys<T>]?: ValidatorTemplate<NonSimpleValues<T>[K], TContext> } : never;

export type ValidatorComplexResultObjects<TV> = NonSimpleValues<TV> extends {
  [K in keyof NonSimpleValues<TV>]: ValidatorResultObjects<NonSimpleValues<TV>[K]>;
} ? { [K in NonSimpleKeys<TV>]?: ValidatorResultObjects<NonSimpleValues<TV>[K]> } : never;


////
export type ValidatorConfig<TV extends Record<string, any>, TContext extends Record<string, any>> = {
  id?: string,
  items?: ItemType<TV, TContext>,
  nested?: NestedType<TV>
  options?: ValidatorOptions
}

export type ValidatorTemplateConfig<TV extends Record<string, any>, TContext extends Record<string, any>> = {
  id?: string,
  items?: ItemType<TV, TContext>,
  nested?: TemplateNestedType<TV, TContext>,
  options?: ValidatorOptions
}

export type KeysOfType<O, T> = {
  [K in keyof O]: O[K] extends T | undefined ? K : never;
}[keyof O];
