export type Primitive = string | number | boolean | bigint | Date;

export type IsPrimitive<T> = T extends Primitive ? true : false;

export type ExtractNonPrimitiveKeys<T extends Record<string, any>> = {
  [K in keyof T]: IsPrimitive<T[K]> extends true ? never : K;
}[keyof T];