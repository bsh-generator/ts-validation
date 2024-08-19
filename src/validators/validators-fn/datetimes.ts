import {FnConfig, TypeValidator} from "./base";
import {KeysOfType} from "../utils";
import {CurrentLocalize} from "../messages";

const msgs = () => CurrentLocalize.datetime
const toTimestamp = (date: Date): number => new Date(date).valueOf()

export class DateTimes<T extends Date | undefined = Date> extends TypeValidator<T> {
  undefined(): DateTimes<T | undefined>{
    return new DateTimes<T | undefined>()
  }

  required(options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  equals(dateTime: Date, options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && toTimestamp(value) != toTimestamp(dateTime),
      message: msgs().equals,
      options: options,
      args: [dateTime.toISOString()]
    });
  }

  after(dateTime: Date, options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && toTimestamp(value) <= toTimestamp(dateTime),
      message: msgs().after,
      options: options,
      args: [dateTime.toISOString()]
    });
  }

  before(dateTime: Date, options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && toTimestamp(value) >= toTimestamp(dateTime),
      message: msgs().before,
      options: options,
      args: [dateTime.toISOString()]
    });
  }

  between(start: Date, end: Date, options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && (toTimestamp(value) < toTimestamp(start) || toTimestamp(value) > toTimestamp(end)),
      message: msgs().between,
      options: options,
      args: [start.toISOString(), end.toISOString()]
    });
  }

  todayOrAfter(options?: FnConfig): DateTimes<T> {
    const today = new Date();
    return this.useCostume({
      error: value => value && toTimestamp(value) < toTimestamp(today),
      message: msgs().todayOrAfter,
      options: options,
    });
  }

  todayOrBefore(options?: FnConfig): DateTimes<T> {
    const today = new Date();
    return this.useCostume({
      error: value => value && toTimestamp(value) > toTimestamp(today),
      message: msgs().todayOrBefore,
      options: options,
    });
  }

  past(options?: FnConfig): DateTimes<T> {
    return this.before(new Date(), {...options, message: options?.message || msgs().past});
  }

  future(options?: FnConfig): DateTimes<T> {
    return this.after(new Date(), {...options, message: options?.message || msgs().future});
  }

  weekday(options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && value.getDay() % 6 === 0, // 0 or 6 represent Sunday and Saturday
      message: msgs().weekday,
      options: options
    });
  }

  weekend(options?: FnConfig): DateTimes<T> {
    return this.useCostume({
      error: value => value && value.getDay() % 6 !== 0, // 1-5 represent Monday to Friday
      message: msgs().weekend,
      options: options
    });
  }

  ////////////////////////////////////////////
  as<TO extends Record<string, any>>(key: KeysOfType<TO, Date>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value && toTimestamp(value) != toTimestamp(parent[key]),
      message: msgs().as,
      options: options,
      args: [key],
    })
  }
}
