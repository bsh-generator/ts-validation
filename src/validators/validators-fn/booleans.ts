import {FnConfig, TypeValidator} from "./base";
import {KeysOfType} from "../utils";
import {CurrentLocalize} from "../messages";

const msgs = () => CurrentLocalize.boolean

export class Booleans<T extends boolean | undefined = boolean> extends TypeValidator<T> {
  undefined(): Booleans<T | undefined>{
    return new Booleans<T | undefined>()
  }

  required(options?: FnConfig): Booleans<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  true(options?: FnConfig): Booleans<T> {
    return this.useCostume({
      error: value => value !== true,
      message: msgs().true,
      options: options
    });
  }

  false(options?: FnConfig): Booleans<T> {
    return this.useCostume({
      error: value => value !== false,
      message: msgs().false,
      options: options
    });
  }

  equals(compareValue: boolean, options?: FnConfig): Booleans<T> {
    return this.useCostume({
      error: value => value !== compareValue,
      message: msgs().equals,
      options: options,
      args: [compareValue]
    });
  }

  ////////////////////////////////////////////
  as<TO extends Record<string, any>>(key: KeysOfType<TO, boolean>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value != parent[key],
      message: msgs().as,
      options: options,
      args: [key],
    })
  }
}
