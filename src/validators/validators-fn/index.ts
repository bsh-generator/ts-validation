import { Strings } from "./strings";
import { Numbers } from "./numbers";
import { Booleans } from "./booleans";
import { Dates } from "./dates";
import { DateTimes } from "./datetimes";
import { Times } from "./times";
import { TypeValidator, TypeValidatorWithContext } from "./base";
import { Arrays } from "./arrays";
import { ValidatorItem } from "../main";
import { Primitive } from "../utils";

export { TypeValidator } from "./base";

export const custom = <T>(): TypeValidator<T> => {
  return new TypeValidator<T>();
};

export const string = <T extends string | undefined = string>(): Strings<T> => {
  return new Strings<T>();
};

export const number = <T extends number | undefined = number>(): Numbers<T> => {
  return new Numbers<T>();
};

export const boolean = <T extends boolean | undefined = boolean>(): Booleans<T> => {
  return new Booleans<T>();
};

export const date = <T extends Date | undefined = Date>(): Dates<T> => {
  return new Dates<T>();
};

export const time = <T extends Date | undefined = Date>(): Times<T> => {
  return new Times<T>();
};

export const datetime = <T extends Date | undefined = Date>(): DateTimes<T> => {
  return new DateTimes<T>();
};

export const array = <T>(): Arrays<T, Array<T>> => {
  return new Arrays<T, Array<T>>();
};

// export const eNum = <T extends number | string>(): Enums<T> => {
//   return new Enums<T>()
// }

// export const object = (): Objects => {
//   return new Objects()
// }

/**
 * build validator for single type (string | number | ...)
 */
export function primitive<T extends Primitive, CTX extends Record<string, any> = any>(
  validations: TypeValidator<T> | TypeValidatorWithContext<T, CTX>[],
): ValidatorItem<T, CTX> {
  const vi = new ValidatorItem<T, CTX>();
  vi.setValidations(validations);
  return vi;
}
