import { FnConfig, TypeValidator } from "./base";
import { KeysOfType } from "../utils";
import { CurrentLocalize } from "../messages";

const msgs = () => CurrentLocalize.number;

export class Numbers<T extends number | undefined = number> extends TypeValidator<T> {
  undefined(): Numbers<T | undefined> {
    return new Numbers<T | undefined>();
  }

  required(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  min(minValue: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && value < minValue,
      message: msgs().min,
      options: options,
      args: [minValue],
    });
  }

  max(maxValue: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && value > maxValue,
      message: msgs().max,
      options: options,
      args: [maxValue],
    });
  }

  range(minValue: number, maxValue: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (value < minValue || value > maxValue),
      message: msgs().range,
      options: options,
      args: [minValue, maxValue],
    });
  }

  integer(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && !Number.isInteger(value),
      message: msgs().integer,
      options: options,
    });
  }

  positive(options?: FnConfig): Numbers<T> {
    return this.min(0, { ...options, message: options?.message || msgs().positive });
  }

  negative(options?: FnConfig): Numbers<T> {
    return this.max(0, { ...options, message: options?.message || msgs().negative });
  }

  decimal(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && Number.isInteger(value),
      message: msgs().decimal,
      options: options,
    });
  }

  multipleOf(divisor: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && value % divisor !== 0,
      message: msgs().multipleOf,
      options: options,
      args: [divisor],
    });
  }

  betweenExclusive(minValue: number, maxValue: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (value <= minValue || value >= maxValue),
      message: msgs().betweenExclusive,
      options: options,
      args: [minValue, maxValue],
    });
  }

  even(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && value % 2 !== 0,
      message: msgs().even,
      options: options,
    });
  }

  odd(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && value % 2 === 0,
      message: msgs().odd,
      options: options,
    });
  }

  positiveInteger(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (!Number.isInteger(value) || value <= 0),
      message: msgs().positiveInteger,
      options: options,
    });
  }

  negativeInteger(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (!Number.isInteger(value) || value >= 0),
      message: msgs().negativeInteger,
      options: options,
    });
  }

  positiveDecimal(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (Number.isInteger(value) || value <= 0),
      message: msgs().positiveDecimal,
      options: options,
    });
  }

  negativeDecimal(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (Number.isInteger(value) || value >= 0),
      message: msgs().negativeDecimal,
      options: options,
    });
  }

  divisibleBy(divisor: number, options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && !Number.isInteger(value / divisor),
      message: msgs().divisibleBy,
      options: options,
      args: [divisor],
    });
  }

  perfectSquare(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && !Number.isInteger(Math.sqrt(value)),
      message: msgs().perfectSquare,
      options: options,
    });
  }

  primeNumber(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => {
        if (value === undefined || value < 2) return true;
        for (let i = 2; i <= Math.sqrt(value); i++) {
          if (value % i === 0) return true;
        }
        return false;
      },
      message: msgs().primeNumber,
      options: options,
    });
  }

  fibonacciNumber(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => {
        if (value === undefined || value < 0) return true;
        let a = 0, b = 1;
        while (b < value) {
          let temp = b;
          b += a;
          a = temp;
        }
        return b !== value;
      },
      message: msgs().fibonacciNumber,
      options: options,
    });
  }

  powerOfTwo(options?: FnConfig): Numbers<T> {
    return this.useCostume({
      error: value => value !== undefined && (value & (value - 1)) !== 0,
      message: msgs().powerOfTwo,
      options: options,
    });
  }

  ////////////////////////////////////////////
  as<TO extends Record<string, any>>(key: KeysOfType<TO, number>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value != parent[key],
      message: msgs().as,
      options: options,
      args: [key],
    });
  }
}
