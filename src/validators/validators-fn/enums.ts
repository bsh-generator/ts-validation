import { FnConfig, TypeValidator } from "./base";

export class Enums<T extends number | string | undefined> extends TypeValidator<T> {
  in(values: T[], options?: FnConfig): Enums<T> {
    return this.useCostume({
      error: value => value !== undefined && !values.includes(value),
      message: `Value must be one of %1`,
      options: options,
      args: [values],
    });
  }

  notIn(values: T[], options?: FnConfig): Enums<T> {
    return this.useCostume({
      error: value => value !== undefined && values.includes(value),
      message: `Value must not be one of %1`,
      options: options,
      args: [values],
    });
  }

  equals(compareValue: T, options?: FnConfig): Enums<T> {
    return this.useCostume({
      error: value => value !== compareValue,
      message: `Value must be equal to %1`,
      options: options,
      args: [compareValue],
    });
  }

  notEquals(compareValue: T, options?: FnConfig): Enums<T> {
    return this.useCostume({
      error: value => value === compareValue,
      message: `Value must not be equal to %1`,
      options: options,
      args: [compareValue],
    });
  }
}
