import {Strings} from "../validators-fn/strings";
import {Numbers} from "../validators-fn/numbers";
import {Booleans} from "../validators-fn/booleans";
import {Arrays} from "../validators-fn/arrays";
import {Dates} from "../validators-fn/dates";
import {DateTimes} from "../validators-fn/datetimes";
import {Times} from "../validators-fn/times";
import {TypeValidator} from "../validators-fn";
import {fr} from "./fr";
import {en} from "./en";
import {ar} from "./ar";

type KeysWithout<T, EX> = T extends EX | keyof TypeValidator<any> ? never : T

type Messages<T extends TypeValidator<any>, EX = 'undefined'> = { [k in KeysWithout<keyof T, EX>]: string }

export type ErrorMessage = {
  noMessage: string,
  string: Messages<Strings>,
  number: Messages<Numbers>,
  boolean: Messages<Booleans>,
  array: Messages<Arrays<any, any[]>>,
  date: Messages<Dates>,
  datetime: Messages<DateTimes>,
  time: Messages<Times>,
}

export const Messages = {en, fr, ar}

export type LocalType = keyof typeof Messages

export let CurrentLocalize = en

export const changeLocal = (local: LocalType) => {
  CurrentLocalize = Messages[local]
}
