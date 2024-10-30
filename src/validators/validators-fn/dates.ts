import { FnConfig, TypeValidator } from "./base";
import { KeysOfType } from "../utils";
import { CurrentLocalize } from "../messages";

const msgs = () => CurrentLocalize.date;

const toDate = (date: Date) => date.toISOString().slice(0, 10);
const toTimestamp = (date: Date): number => new Date(date.getFullYear(), date.getMonth(), date.getDate()).valueOf();

export class Dates<T extends Date | undefined = Date> extends TypeValidator<T> {
  undefined(): Dates<T | undefined> {
    return new Dates<T | undefined>();
  }

  required(options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  equals(dateTime: Date, options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) != toTimestamp(dateTime),
      message: msgs().equals,
      options: options,
      args: [toDate(dateTime)],
    });
  }

  after(date: Date, options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) <= toTimestamp(date),
      message: msgs().after,
      options: options,
      args: [toDate(date)],
    });
  }

  before(date: Date, options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) >= toTimestamp(date),
      message: msgs().before,
      options: options,
      args: [toDate(date)],
    });
  }

  between(start: Date, end: Date, options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && (toTimestamp(value) < toTimestamp(start) || toTimestamp(value) > toTimestamp(end)),
      message: msgs().between,
      options: options,
      args: [toDate(start), toDate(end)],
    });
  }

  todayOrAfter(options?: FnConfig): Dates<T> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) < toTimestamp(today),
      message: msgs().todayOrAfter,
      options: options,
    });
  }

  todayOrBefore(options?: FnConfig): Dates<T> {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) > toTimestamp(today),
      message: msgs().todayOrBefore,
      options: options,
    });
  }

  past(options?: FnConfig): Dates<T> {
    return this.before(new Date(), { ...options, message: options?.message || msgs().past });
  }

  future(options?: FnConfig): Dates<T> {
    return this.after(new Date(), { ...options, message: options?.message || msgs().future });
  }

  weekday(options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && value.getDay() % 6 === 0, // 0 or 6 represent Sunday and Saturday
      message: msgs().weekday,
      options: options,
    });
  }

  weekend(options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && value.getDay() % 6 !== 0, // 1-5 represent Monday to Friday
      message: msgs().weekend,
      options: options,
    });
  }

  leapYear(options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && (
        value.getFullYear() % 4 === 0 &&
        value.getFullYear() % 100 !== 0 ||
        value.getFullYear() % 400 === 0
      ),
      message: msgs().leapYear,
      options: options,
    });
  }

  sameDayAs(date: Date, options?: FnConfig): Dates<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) !== toTimestamp(date),
      message: msgs().sameDayAs,
      options: options,
      args: [toDate(date)],
    });
  }

  ////////////////////////////////////////////
  as<TO extends Record<string, any>>(key: KeysOfType<TO, Date>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value != undefined && toTimestamp(value) != toTimestamp(parent[key]),
      message: msgs().as,
      options: options,
      args: [key],
    });
  }
}
