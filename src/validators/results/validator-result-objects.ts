import {SimpleType} from "../utils";

export type ValidatorResult<TV = any> = ValidatorResultObjects<TV> | ValidatorResultArrays

type ValidatorResultTemplate<SimpleType, NestedType> = {
  items?: SimpleType
  nested?: NestedType
}

export type ValidatorResultObjects<TV> =
  ValidatorResultTemplate<
    ValidatorSimpleResult[],
    ValidatorComplexResultObjects<TV>
  >

export type ValidatorSimpleResult<T = any> = {
  field: string
  value?: T
  valid?: boolean
  message?: string
}

export type ValidatorComplexResultObjects<TV> = {
  [k in keyof TV as TV[k] extends SimpleType
    ? never
    : TV[k] extends (infer U) | undefined
      ? U extends SimpleType
        ? never
        : k
      : k]?: ValidatorResultObjects<TV[k]>
}

//////////////////////

export type ValidatorResultArrays =
  ValidatorResultTemplate<
    ValidatorSimpleResult[],
    ValidatorComplexResultVFieldName[]
  >

export type ValidatorComplexResultVFieldName = {
  field: string,
  result?: ValidatorResultArrays
}
