import {FnConfig, TypeValidator} from "./base";
import {CurrentLocalize} from "../messages";

const msgs = () => CurrentLocalize.array

export class Arrays<T, TA extends Array<T> | undefined> extends TypeValidator<TA> {
  undefined(): Arrays<T, TA | undefined> {
    return new Arrays<T, TA | undefined>()
  }

  length(length: number, options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: value => value !== undefined && value.length !== length,
      message: msgs().length,
      options: options,
      args: [length]
    });
  }

  min(length: number, options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: value => value !== undefined && value.length < length,
      message: msgs().min,
      options: options,
      args: [length]
    });
  }

  max(length: number, options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: value => value !== undefined && value.length > length,
      message: msgs().max,
      options: options,
      args: [length]
    });
  }

  has(value: T, options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: (array) => array !== undefined && !array.includes(value),
      message: msgs().has,
      options: options,
      args: [value]
    });
  }

  hasAll(values: T[], options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: (array) => array !== undefined && !values.every(value => array.includes(value)),
      message: msgs().hasAll,
      options: options,
      args: [values.join(", ")]
    });
  }

  hasAny(values: T[], options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: (array) => array !== undefined && values.some(value => array.includes(value)),
      message: msgs().hasAny,
      options: options,
      args: [values.join(", ")]
    });
  }

  hasNone(values: T[], options?: FnConfig): Arrays<T, TA> {
    return this.useCostume({
      error: (array) => array !== undefined && values.every(value => !array.includes(value)),
      message: msgs().hasNone,
      options: options,
      args: [values.join(", ")]
    });
  }

  some(predicate: (value: T, index: number, array: T[]) => boolean, options?: FnConfig) {
    return this.useCostume({
      error: (array) => array !== undefined && array.some(predicate),
      message: msgs().some,
      options: options
    });
  }

  every(predicate: (value: T, index: number, array: T[]) => boolean, options?: FnConfig) {
    return this.useCostume({
      error: (array) => array !== undefined && array.every(predicate),
      message: msgs().every,
      options: options
    });
  }
}
