import {Primitive} from "../utils";

export type ValidatorResult<TV extends Record<string, any> = any> = ValidatorResultObjects<TV> | ValidatorResultArrays

type ValidatorResultBase<SimpleType, NestedType> = {
  items?: SimpleType
  nested?: NestedType
}

export type ValidatorResultObjects<TV extends Record<string, any>> =
  ValidatorResultBase<
    ValidatorSimpleResult[],
    ValidatorComplexResultObjects<TV>
  >

export type ValidatorSimpleResult<T = any> = {
  field: string
  value?: T
  valid?: boolean
  message?: string
}

export type ValidatorComplexResultObjects<T extends Record<string, any>> = {
  [k in keyof T as T[k] extends Primitive
      ? never
      : T[k] extends infer U | undefined
          ? U extends Primitive
              ? never
              : k
          : k]?: ValidatorResultObjects<T[k]>;
}

//////////////////////

export type ValidatorResultArrays =
  ValidatorResultBase<
    ValidatorSimpleResult[],
    ValidatorComplexResultVFieldName[]
  >

export type ValidatorComplexResultVFieldName = {
  field: string,
  result?: ValidatorResultArrays
}
