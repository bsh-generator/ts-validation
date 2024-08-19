import {FnConfig, TypeValidator} from "./base";
import {KeysOfType} from "../utils";
import {CurrentLocalize} from "../messages";

const msgs = () => CurrentLocalize.time
const toTimestamp = (date: Date): number => new Date(0, 0, 0, date.getHours(), date.getMinutes(), date.getSeconds()).valueOf()
const toFullTimestamp = (date: Date): number => new Date(date).valueOf()

export class Times<T extends Date | undefined = Date> extends TypeValidator<T> {
  undefined(): Times<T | undefined> {
    return new Times<T | undefined>()
  }

  required(options?: FnConfig): Times<T> {
    return this.useCostume({
      error: value => value === undefined,
      message: msgs().required,
      options,
    });
  }

  equals(time: Date, options?: FnConfig): Times<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) != toTimestamp(time),
      message: msgs().equals,
      options: options,
      args: [time.toISOString()]
    });
  }

  after(time: Date, options?: FnConfig): Times<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) <= toTimestamp(time),
      message: msgs().after,
      options,
      args: [time.toTimeString()]
    });
  }

  before(time: Date, options?: FnConfig): Times<T> {
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) >= toTimestamp(time),
      message: msgs().before,
      options,
      args: [time.toTimeString()]
    });
  }

  between(start: Date, end: Date, options?: FnConfig): Times<T> {
    return this.useCostume({
      error: value => value !== undefined && (toTimestamp(value) < toTimestamp(start) || toTimestamp(value) > toTimestamp(end)),
      message: msgs().between,
      options,
      args: [start.toTimeString(), end.toTimeString()]
    });
  }

  nowOrAfter(options?: FnConfig): Times<T> {
    const now = new Date();
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) <= toTimestamp(now),
      message: msgs().nowOrAfter,
      options
    });
  }

  nowOrBefore(options?: FnConfig): Times<T> {
    const now = new Date();
    return this.useCostume({
      error: value => value !== undefined && toTimestamp(value) >= toTimestamp(now),
      message: msgs().nowOrBefore,
      options
    });
  }

  past(options?: FnConfig): Times<T> {
    const now = new Date();
    return this.after(now, {...options, message: options?.message || msgs().past});
  }

  future(options?: FnConfig): Times<T> {
    const now = new Date();
    return this.before(now, {...options, message: options?.message || msgs().future});
  }

  within24Hours(options?: FnConfig): Times<T> {
    const now = new Date();
    const _24HoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return this.useCostume({
      error: value => value !== undefined && (
        toFullTimestamp(value) < toFullTimestamp(now) ||
        toFullTimestamp(value) > toFullTimestamp(_24HoursFromNow)
      ),
      message: msgs().within24Hours,
      options
    });
  }

  as<TO extends Record<string, any>>(key: KeysOfType<TO, Date>, options?: FnConfig) {
    return this.useCostume<TO>({
      error: (value, parent) => value != undefined && toTimestamp(value) != toTimestamp(parent[key]),
      message: msgs().as,
      options: options,
      args: [key],
    })
  }
}
