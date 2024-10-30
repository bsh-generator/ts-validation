import { FnConfig, TypeValidator } from "./base";
import { KeysOfType, regex } from "../utils";
import { CurrentLocalize } from "../messages";

const msgs = () => CurrentLocalize.string;

export class Strings<T extends string | undefined = string> extends TypeValidator<T> {
  undefined(): Strings<T | undefined> {
    return new Strings<T | undefined>();
  }

  required(options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  notEmpty(options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && value === "",
      message: msgs().notEmpty,
      options: options,
    });
  }

  min(length: number, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && value.length < length,
      message: msgs().min,
      options: options,
      args: [length],
    });
  }

  max(length: number, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && value.length > length,
      message: msgs().max,
      options: options,
      args: [length],
    });
  }

  includes(substring: string, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && !value.includes(substring),
      message: msgs().includes,
      options: options,
      args: [substring],
    });
  }

  includesAll(substrings: string[], options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && !substrings.every(substring => value.includes(substring)),
      message: msgs().includesAll,
      options: options,
      args: [substrings.join(", ")],
    });
  }

  startsWith(prefix: string, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && !value.startsWith(prefix),
      message: msgs().startsWith,
      options: options,
      args: [prefix],
    });
  }

  endsWith(suffix: string, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && !value.endsWith(suffix),
      message: msgs().endsWith,
      options: options,
      args: [suffix],
    });
  }

  matches(pattern: RegExp, options?: FnConfig): Strings<T> {
    return this.useCostume({
      error: value => value !== undefined && !pattern.test(value),
      message: msgs().matches,
      options: options,
    });
  }

  email(options?: FnConfig): Strings<T> {
    return this.matches(regex.EMAIL, { ...options, message: options?.message || msgs().email });
  }

  phone(options?: FnConfig): Strings<T> {
    return this.matches(regex.PHONE, { ...options, message: options?.message || msgs().phone });
  }

  url(options?: FnConfig): Strings<T> {
    return this.matches(regex.URL, { ...options, message: options?.message || msgs().url });
  }

  date(options?: FnConfig): Strings<T> {
    return this.matches(regex.DATE, { ...options, message: options?.message || msgs().date });
  }

  time(options?: FnConfig): Strings<T> {
    return this.matches(regex.TIME, { ...options, message: options?.message || msgs().time });
  }

  hexColor(options?: FnConfig): Strings<T> {
    return this.matches(regex.HEX_COLOR, { ...options, message: options?.message || msgs().hexColor });
  }

  creditCard(options?: FnConfig): Strings<T> {
    return this.matches(regex.CREDIT_CARD, { ...options, message: options?.message || msgs().creditCard });
  }

  htmlTag(options?: FnConfig): Strings<T> {
    return this.matches(regex.HTML_TAG, { ...options, message: options?.message || msgs().htmlTag });
  }

  base64(options?: FnConfig): Strings<T> {
    return this.matches(regex.BASE64, { ...options, message: options?.message || msgs().base64 });
  }

  alphanumeric(options?: FnConfig): Strings<T> {
    return this.matches(regex.ALPHANUMERIC, { ...options, message: options?.message || msgs().alphanumeric });
  }

  numeric(options?: FnConfig): Strings<T> {
    return this.matches(regex.NUMERIC, { ...options, message: options?.message || msgs().numeric });
  }

  alpha(options?: FnConfig): Strings<T> {
    return this.matches(regex.ALPHA, { ...options, message: options?.message || msgs().alpha });
  }

  /////TODO add in() to set the  allowed values

  ////////////////////////////////////////////
  as<TO extends Record<string, any>>(key: KeysOfType<TO, string>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value != parent[key],
      message: msgs().as,
      options: options,
      args: [key],
    });
  }
}
