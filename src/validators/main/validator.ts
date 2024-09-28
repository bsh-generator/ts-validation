import {
  BshBatchValidationError,
  BshValidationError, ValidatorComplexResultObjects,
  ValidatorComplexResultVFieldName,
  ValidatorResult,
  ValidatorResultArrays,
  ValidatorResultObjects,
  ValidatorSimpleResult,
} from "../results";
import { ValidatorItem } from "./validator-item";
import {
  BatchValidatorResultInfo,
  ExtractNonPrimitiveKeys,
  NestedType,
  ValidatorConfig,
  ValidatorOptions,
  ValidatorResultInfo,
} from "../utils";
import { options } from "../options";
import logger from "../logger";
import { BshgError } from "../exceptions";

type ValidatorItemsType<T extends Record<string, any>> = { [K in keyof T]?: ValidatorItem<T[K], T> }

type ValidatorStatus<T extends Record<string, any>> = {
  field?: Extract<ExtractNonPrimitiveKeys<T>, string>
  valid?: boolean
  message?: string
}

export class Validator<
  T extends Record<string, any>,
  TContext extends Record<string, any> = any
> {
  #id: string = Object.getPrototypeOf(this).constructor.name;
  #options: ValidatorOptions = options;
  #getter!: () => T;
  #items?: ValidatorItemsType<T>;
  #nested?: NestedType<T, TContext>;
  context?: TContext;
  onChangeEvent?: (obj: T) => void;

  // TODO: show the status in the results collections
  status: ValidatorStatus<T> = {} as ValidatorStatus<T>;

  config(config: ValidatorConfig<T, TContext>): this {
    if (this.#getter != undefined && this.#getter() == undefined) throw new BshgError(
      this.#id, `The Object is undefined! We can not create a validator for undefined object.`,
    );

    if (config.id) this.#id = config.id;

    if (config.items) {
      const fields: Record<keyof T, ValidatorItem<any, T>> = {} as any;
      for (const key in config.items) {
        if (!Object.prototype.hasOwnProperty.call(config.items, key)) continue;
        const item = new ValidatorItem<any, T>();
        item.container = () => this.#getter();
        item.get = () => this.#getter()[key];
        item.set = (value) => (this.#getter()[key] = value);
        item.name = key;
        item.setValidations(config.items[key]);
        item.validator = this;
        fields[key as keyof T] = item;
      }
      this.#items = fields;
    }

    if (config.nested) {
      for (const key in config.nested) {
        if (!Object.prototype.hasOwnProperty.call(config.nested, key)) continue;
        const nested = config.nested[key];
        if (nested == undefined) continue;
        nested.#getter = () => this.#getter()[key];
        // @ts-ignore
        nested.status.field = key;
        this.nested[key] = nested;
      }
    }

    return this;
  }

  #ready(): boolean {
    if (this.#getter == undefined || this.#getter() == undefined) {
      this.status.valid = false;
      this.status.message = `The value ${this.status.field ? "of " + this.status.field : ""} is undefined.`;
      return false;
    }
    this.status.valid = undefined;
    this.status.message = undefined;
    return true;
  }

  get #validatorItems(): ValidatorItem<any, T>[] {
    return this.#items ? Object.values(this.#items) : [];
  }

  get #nestedValues(): Validator<any, any>[] {
    return Object.values(this.nested);
  }

  get nested() {
    if (!this.#nested) this.#nested = {} as NestedType<T, TContext>;
    return this.#nested;
  }

  get items(): ValidatorItemsType<T> {
    return this.#items ? this.#items : {};
  }

  options(value: ValidatorOptions): this {
    this.#options = { ...this.#options, ...value };
    return this;
  }

  allGood(): boolean {
    const filtered = this.#validatorItems.filter(it => it.valid != undefined); /* filter out the none validated items */
    if (filtered.length == 0) return this.status.valid != undefined && this.status.valid; // no validation are applied
    const result = filtered.every((it) => it.valid);
    this.status.valid = result;
    this.status.message = result ? undefined : "invalid";
    return result;
  }

  applyAll() {
    this.#validatorItems.forEach((it) => it.validate());
  }

  async applyAllAsync() {
    await Promise.all(this.#validatorItems.map(async it => await it.validateAsync()));
  }

  reset() {
    const validators = [this, ...this.#nestedValues];
    validators.forEach((it) => it.#validatorItems.forEach((it) => it.reset()));
  }

  init(getter: () => T) {
    this.#getter = getter;
    return this;
  }

  ///////////////////////////////////////////////////
  ///////////// CONTEXT /////////////////////////////
  ///////////////////////////////////////////////////
  withContext(context: TContext) {
    this.context = context;
    return this;
  }

  ///////////////////////////////////////////////////
  ///////////// ERRORS GENERATORS ///////////////////
  ///////////////////////////////////////////////////
  private generateErrorsAsObject(): ValidatorResultObjects<T> {
    const result = {} as ValidatorResultObjects<T>;

    if (this.#validatorItems.length > 0) {
      const simple = this.#validatorItems
        .filter(it => it && !it.valid)
        .map((it) => {
          return {
            field: it.name,
            message: it.message,
            valid: false,
            value: it.get(),
          } as ValidatorSimpleResult;
        });
      if (simple.length > 0) result.items = simple;
    }

    if (this.#nested) {
      const nested = {} as ValidatorComplexResultObjects<T>;
      for (let key in this.#nested) {
        if (this.#nested[key] != undefined) {
          // @ts-ignore
          nested[key] = this.#nested[key]?.generateErrorsAsObject();
        }
      }
      if (Object.keys(nested).length > 0) result.nested = nested;
    }
    return result;
  }

  private generateErrorsAsArray(): ValidatorResultArrays {
    const result = {} as ValidatorResultArrays;

    if (this.#validatorItems.length > 0) {
      const simple = this.#validatorItems
        .filter((it) => it && !it.valid)
        .map((it) => {
          return {
            field: it.name,
            message: it.message,
            valid: false,
            value: it.get(),
          } as ValidatorSimpleResult;
        });
      if (simple.length > 0) result.items = simple;
    }

    if (this.#nested) {
      const nested = [];
      for (let key in this.#nested) {
        const error = {} as ValidatorComplexResultVFieldName;
        error.field = key;
        error.result = this.#nested[key]?.generateErrorsAsArray();
        nested.push(error);
      }

      if (nested.length > 0) result.nested = nested;
    }
    return result;
  }

  private generateErrors(): ValidatorResult {
    if (this.#options.resultsType == "array")
      return this.generateErrorsAsArray();
    else
      return this.generateErrorsAsObject();
  }

  ///////////////////////////////////////////////////
  ///////////// SINGLE VALIDATIONS //////////////////
  ///////////////////////////////////////////////////
  validate(data?: T): boolean {
    if (data) {
      this.#getter = () => data;
    }

    const validators = [this, ...(Object.values(this.nested) as Validator<any, any>[])];
    validators.forEach((it) => {
      if (it.#ready()) it.applyAll();
    });
    const isValid = validators.every((it) => it.allGood());

    this.#info(`validation result `, isValid);

    return isValid;
  }

  async validateAsync(data?: T): Promise<boolean> {
    if (data) {
      this.#getter = () => data;
    }

    const validators = [this, ...(Object.values(this.nested) as Validator<any, any>[])];
    await Promise.all(
      validators.map(async it => {
        if (it.#ready()) await it.applyAllAsync();
      }),
    );
    const isValid = validators.every((it) => it.allGood());

    this.#info(`validation result `, isValid);

    return isValid;
  }

  validateInfo(data?: T): ValidatorResultInfo {
    if (this.validate(data)) return { success: true };
    else {
      const results = this.generateErrors();
      this.#info(results);
      return { success: false, results };
    }
  }

  async validateInfoAsync(data?: T): Promise<ValidatorResultInfo> {
    const res = await this.validateAsync(data);
    if (res) return { success: true };
    else {
      const results = this.generateErrors();
      this.#info(results);
      return { success: false, results };
    }
  }

  validateThrow(data?: T) {
    if (!this.validate(data)) {
      const results = this.generateErrors();
      this.#info(results);
      throw new BshValidationError(results);
    }
  }

  async validateThrowAsync(data?: T): Promise<void> {
    const res = await this.validateAsync(data);
    if (!res) {
      const results = this.generateErrors();
      this.#info(results);
      throw new BshValidationError(results);
    }
  }

  ///////////////////////////////////////////////////
  ///////////// BATCH VALIDATIONS ///////////////////
  ///////////////////////////////////////////////////
  batchValidate(...data: T[]): BatchValidatorResultInfo {
    const results: ValidatorResultInfo[] = [];
    data?.forEach(it => {
      results.push(
        this.init(() => it).validateInfo(),
      );
    });

    return { success: results.every(it => it.success), results };
  }

  async batchValidateAsync(...data: T[]): Promise<BatchValidatorResultInfo> {
    const results: ValidatorResultInfo[] = [];
    // TODO: Do the validations in the same time for all items,
    //  to reduce the validation duration
    //  if it is possible?
    for (let it of data) {
      const validatorResultInfo = await this.init(() => it).validateInfoAsync();
      results.push(validatorResultInfo);
    }

    return { success: results.every(it => it.success), results };
  }

  batchValidateThrow(...data: T[]) {
    const batchResult = this.batchValidate(...data);
    if (!batchResult.success) throw new BshBatchValidationError(batchResult.results);
  }

  async batchValidateThrowAsync(...data: T[]): Promise<void> {
    const batchResult = await this.batchValidateAsync(...data);
    if (!batchResult.success) throw new BshBatchValidationError(batchResult.results);
  }

  ///////////////////////////////////////////////////
  ///////////// IMPORT METHOD ///////////////////////
  ///////////////////////////////////////////////////
  import(results: ValidatorResult) {
    if (this.#items != undefined) {
      results.items?.forEach(it => {
        const validatorItem =
          (this.#items as ValidatorItemsType<T>)[it.field as keyof T] as ValidatorItem<any, T>;
        if (validatorItem == undefined) {
          this.#warn(`Unknown validatorItem '${it.field}' in ${this.#id}!\nIt Will be ignored!`);
        } else {
          validatorItem.valid = it.valid;
          validatorItem.message = it.message;
          // TODO: add these logs to separate file to let the code source clean
          if (this.#getter == undefined) this.#warn(`if the value of '${it.field}' value is modified, the change will be ignored unless the \`.init()\` method is used. To ensure the update is applied, please use \`.init()\` to apply the changes correctly.`);
          else validatorItem.set(it.value);
        }
      });
    } else if (results.items) {
      this.#warn(`No Simple Fields Found in ${this.#id}`);
    }

    if (this.#nested != undefined) {
      if (this.#options.resultsType == "object") {
        const nested = results.nested as ValidatorComplexResultObjects<T>;
        for (const key in nested) {
          // @ts-ignore
          const validator = this.#nested[key];
          if (nested[key] != undefined)
            validator?.import(<unknown>nested[key] as ValidatorResultObjects<T>);
        }
      } else {
        const nested = results.nested as ValidatorComplexResultVFieldName[];
        nested.forEach(it => {
          const validator = this.#nested != undefined ? ((this.#nested)[it.field as keyof NestedType<T, TContext>]) as Validator<any, any> : undefined;
          if (validator == undefined) {
            this.#warn(`${it.field} is unknown nested validator in ${this.#id}!\nIt Will be ignored!`);
          } else {
            validator.import(it.result as ValidatorResultArrays);
          }
        });
      }
    } else if (results.nested) {
      this.#warn(`No Nested Validator Exist in ${this.#id}! But the error has.`);
    }
  }


  ///////////////////////////////////////////////////
  ///////////// ONCHNAGE EVENT METHOD ///////////////
  ///////////////////////////////////////////////////
  onChange(event: (obj: T) => void): this {
    this.onChangeEvent = event;
    return this;
  }


  ///////////////////////////////////////////////////
  ///////////// GET ITEM STATUS /////////////////////
  ///////////////////////////////////////////////////
  validateItem(key: keyof T): void { // TODO search foe better name
    this.items[key]?.validate();
  }

  isItemValid(key: keyof T): boolean | undefined { // TODO search foe better name
    return this.items[key]?.valid;
  }

  itemMessage(key: keyof T): string | undefined { // TODO search foe better name
    return this.items[key]?.message;
  }

  ///////////////////////////////////////////////////
  ///////////// LOGGERS /////////////////////////////
  ///////////////////////////////////////////////////
  #info(...data: any[]) {
    logger.info(this.#id, this.#options.dev || false, ...data);
  }

  #warn(...data: any[]) {
    logger.warn(this.#id, this.#options.dev || false, ...data);
  }

  #error(...data: any[]) {
    logger.error(this.#id, true, ...data);
  }
}
