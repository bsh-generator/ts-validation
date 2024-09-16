# @bshg/validation

visit our docs site: [bshg docs](bshg-libs.vercel.app/ts-validation)
---

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [@bshg/validation](#bshgvalidation)
    - [Introduction](#introduction)
    - [Why Choose `@bshg/validation`?](#why-choose-bshgvalidation)
    - [Getting Started](#getting-started)
        - [Installation](#installation)
        - [Basic Usage](#basic-usage)
    - [`v.validator<Type, TContext>({ ... })`](#vvalidatortype-tcontext--)
        - [Function Signature](#function-signature)
        - [Config Param: `ValidatorConfig`](#config-param-validatorconfig)
        - [Example](#example)
    - [Validator Methods](#validator-methods)
        - [String](#string)
        - [Number](#number)
        - [DateTime](#datetime)
        - [Date](#date)
        - [Time](#time)
        - [Boolean](#boolean)
        - [Arrays](#arrays)
        - [Custom Validation Rule](#custom-validation-rule)
        - [Custom Validator Method](#custom-validator-method)
    - [Define Rules](#define-rules)
        - [Simple Fields](#simple-fields)
            - [Defining Validation Rules for Simple Fields](#defining-validation-rules-for-simple-fields)
            - [Example](#example-1)
        - [Nested Fields](#nested-fields)
            - [1. Using the `nested` Property](#1-using-the-nested-property)
            - [2. Using the `items` Property](#2-using-the-items-property)
    - [Validator API](#validator-api)
        - [Properties](#properties)
        - [Methods](#methods)
    - [ValidatorItem API](#validatoritem-api)
    - [Validator Options](#validator-options)
    - [Validator Template](#validator-template)
        - [`v.template(config)`](#vtemplateconfig)
    - [How To Validate Objects?](#how-to-validate-objects)
        - [1. `validate()`: Simple Boolean Check](#1-validate-simple-boolean-check)
        - [2. `validateInfo()`: Detailed Validation Results](#2-validateinfo-detailed-validation-results)
        - [3. `validateThrow()`: Throwing Errors on Validation Failure](#3-validatethrow-throwing-errors-on-validation-failure)
        - [Choosing Between `.init()` and `.validate(object)`](#choosing-between-init-and-validateobject)
    - [How To Use Real-Time Validation?](#how-to-use-real-time-validation)
        - [Steps to Implement Real-Time Validation](#steps-to-implement-real-time-validation)
        - [Example Usage](#example-usage)
    - [Batch Validation: validate multi objects](#batch-validation-validate-multi-objects)
    - [Async Validation](#async-validation)
        - [Example of Async Validation](#example-of-async-validation)
    - [Context Validation](#context-validation)
        - [Context Type](#context-type)
        - [Context Validation Rules](#context-validation-rules)
        - [Method 1: Static Context Values](#method-1-static-context-values)
        - [Method 2: Dynamic Context Evaluation](#method-2-dynamic-context-evaluation)
        - [Method 3: Context-Aware Validation](#method-3-context-aware-validation)
    - [Error Messages Customization](#error-messages-customization)
        - [Static Messages](#static-messages)
        - [Placeholder Messages](#placeholder-messages)
            - [1. `%n`](#1-n)
            - [2. `%val`](#2-val)
            - [3. `%name`](#3-name)
        - [Dynamic Messages](#dynamic-messages)
        - [Combining Placeholder and Dynamic Messages](#combining-placeholder-and-dynamic-messages)
    - [`import()` API](#import-api)
    - [Multi-Language Support for Validation Messages](#multi-language-support-for-validation-messages)
        - [Configuration](#configuration)
            - [Setting the Default Locale](#setting-the-default-locale)
            - [Changing the Locale at Runtime](#changing-the-locale-at-runtime)
        - [Example Usage](#example-usage-1)
        - [Supported Locales](#supported-locales)
    - [Overriding Default Values](#overriding-default-values)
        - [Overriding Options Globally](#overriding-options-globally)
        - [Overriding Options For A Specific Validator](#overriding-options-for-a-specific-validator)
        - [Overriding Regex Values](#overriding-regex-values)
            - [Using `v.configure()` Method:](#using-vconfigure-method)
            - [Directly in `v.regex` Container:](#directly-in-vregex-container)
            - [Default Regex Patterns:](#default-regex-patterns)
        - [Overriding Localization](#overriding-localization)
    - [What is New?](#what-is-new)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Welcome to `@bshg/validation`, a versatile TypeScript library crafted for seamless data validation within your projects. Whether you're working on a front-end or back-end application, this library empowers you to validate data in a declarative manner, ensuring your objects align with your expectations.

Designed with simplicity and efficiency in mind, `@bshg/validation` streamlines the validation process, making it a reliable choice for your projects. It offers extensive customization options, enabling you to tailor validation rules and error messages to fit your specific requirements with ease.

This library is lightweight and has no external dependencies, ensuring fast load times and minimal impact on your application's performance. Whether you're building a web application, API, or mobile app, you can rely on `@bshg/validation` to handle validation consistently across platforms.

In this guide, you'll explore the features and functionalities of `@bshg/validation`, learning how to leverage its capabilities to fortify your projects with robust data validation.

## Why Choose `@bshg/validation`?

- **Simplicity and Efficiency**: `@bshg/validation` is designed to be straightforward and efficient, making implementation easy while maintaining high performance.
- **Customization**: The library offers extensive customization options for validation rules and error messages, providing flexibility and control tailored to your project's needs.
- **Lightweight**: With no external dependencies, `@bshg/validation` ensures fast load times and minimal impact on performance.
- **Cross-Platform Compatibility**: Suitable for both front-end and back-end applications, it ensures consistent validation across different platforms.
- **Full Stack Library**: Use `@bshg/validation` in both frontend and backend projects, and seamlessly share validation logic between them. This makes displaying server-side validation results on the client-side straightforward and requires no extra code.
- **Autocompletion**: Enhance your development experience with autocompletion support in popular IDEs like VSCode, improving coding efficiency and reducing errors.

## Getting Started

Let's dive into the details of how to use this library effectively.

### Installation

Install `@bshg/validation` via npm:

```bash
npm install @bshg/validation
yarn add @bshg/validation
```

### Basic Usage

1. Creating Your Type
   First, define the TypeScript class for your data model:
    ```typescript
    export class User {
      username: string;
      password: string;
      fullName: string;
      age: number;
      email: string;
      phone: string;
    }
    ```

2. Import the Library
   Import the `v` symbol, which contains all the library methods you can use:
    ```typescript
    import { v } from '@bshg/validation';
    ```

3. Creating a Validator for Your Type
   Create a validator instance for your `User` type:
    ```typescript
    import { v } from '@bshg/validation';
    
    const item = new User();
    
    const validator = v.validator<User>({
      items: {
        username: v.string().required().alpha(),
        password: v.string().required().min(8),
        fullName: v.string().required(),
        email: v.string().required().email(),
        phone: v.string().required().phone(),
        age: v.number().positive(),
      }
    }).init(() => item);
    ```

## `v.validator<Type, TContext>({ ... })`

The `v.validator()` function is the core method that allows you to create validators for your data types. As seen in the previous [Basic Usage](#basic-usage) example with the `User` type, this function requires the data type and accepts a configuration object as a parameter.

This method returns a [`Validator`](#validator-api) instance that can be used to validate your data.

### Function Signature

```typescript
function validator<T, TContext>(config: ValidatorConfig<T, TContext>): Validator<T, TContext> {
}
```

### Config Param: `ValidatorConfig`

The configuration object for `v.validator()` has the following structure:

```typescript
type ValidatorConfig<TV, TContext> = {
  id?: string,
  items?: ItemType<TV, TContext>,
  nested?: NestedType<TV>,
  options?: ValidatorOptions
}
```

| Property  | Type                     | Description                                                                                                                                                                                                 |
|-----------|--------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`      | `string`                 | An optional identifier for the validator. This can be useful if you need to distinguish between multiple validators in your application. It is used to differentiate between the logs of the validators.    |
| `items`   | `ItemType<TV, TContext>` | Defines the validation rules for the individual fields of your data type. This is where you specify the constraints and requirements for each property of your data type. [(read more)](#validator-methods) |
| `nested`  | `NestedType<TV>`         | Allows you to define nested validation rules if your data type contains nested objects that also need validation.                                                                                           |
| `options` | `ValidatorOptions`       | Additional options to configure the behavior of the validator. [(read more)](#validator-options)                                                                                                            |

### Example

1. Data Types:

    ```typescript
    type Profile = {
      fullname: string;
      age: number;
    }
    
    type User = {
      email: string;
      password: string;
      profile: Profile;
    }
    ```

2. Define The Validator:

    ```typescript
    import { v } from '@bshg/validation';
    
    const profileValidator = v.validator<Profile>({
      id: 'profileValidator',
      items: {
        fullname: v.string().required(),
        age: v.number().required().positive(),
      },
    });
    
    const userValidator = v.validator<User>({
      id: 'userValidator',
      items: {
        email: v.string().required().email(),
        password: v.string().required().min(8),
      },
      nested: {
        profile: profileValidator,
      }
    });
    ```

In this example:

- `profileValidator` is used within `userValidator` to validate nested objects.
- The `id` property is specified to distinguish between different validators and manage their logs effectively.
- The `items` property defines validation rules for individual fields.
- The `nested` property allows for the inclusion of validators for nested objects.
- The `options` property can be used for additional configurations to fine-tune the validator's behavior.

> **Note:** `TContext` is used to pass a type of the [context](#context-validation).

## Validator Methods

### String

```typescript
v.string()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .min(5)            // Minimum length is 5
  .max(10)           // Maximum length is 10
  .includes("sub")   // Must include 'sub'
  .includesAll(["sub1", "sub2"])  // Must include 'sub1' and 'sub2'
  .startsWith("prefix")   // Must start with 'prefix'
  .endsWith("suffix")     // Must end with 'suffix'
  .matches(/regexp/)      // Must match the regular expression
  .email()               // Must be a valid email
  .phone()               // Must be a valid phone number
  .url()                 // Must be a valid URL
  .date()                // Must be a valid date (yyyy-mm-dd)
  .time()                // Must be a valid time (hh:mm:ss)
  .hexColor()            // Must be a valid hex color
  .creditCard()          // Must be a valid credit card number
  .htmlTag()             // Must be a valid HTML tag
  .base64()              // Must be a valid base64 string
  .alphanumeric()        // Must contain only numbers and letters
  .numeric()             // Must contain only numbers
  .alpha()               // Must contain only letters
  .as<Type>('key')       // Ensures the value is equal to the value of the specified 'key' property in the parent object.
                         // The 'key' must be a valid key of Type.
```

### Number

```typescript
v.number()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .min(5)            // Value must be greater than or equal to 5
  .max(10)           // Value must be less than or equal to 10
  .range(5, 10)      // Value must be between 5 and 10
  .integer()         // Value must be an integer
  .positive()        // Value must be positive
  .negative()        // Value must be negative
  .decimal()         // Value must be a decimal number
  .multipleOf(3)     // Value must be a multiple of 3
  .betweenExclusive(5, 10)  // Value must be between 5 (exclusive) and 10 (exclusive)
  .even()            // Value must be an even number
  .odd()             // Value must be an odd number
  .positiveInteger() // Value must be a positive integer
  .negativeInteger() // Value must be a negative integer
  .positiveDecimal() // Value must be a positive decimal number
  .negativeDecimal() // Value must be a negative decimal number
  .divisibleBy(3)    // Value must be divisible by 3
  .perfectSquare()   // Value must be a perfect square
  .primeNumber()     // Value must be a prime number
  .fibonacciNumber() // Value must be a Fibonacci number
  .powerOfTwo()      // Value must be a power of two
  .as<Type>('key')   // Same as for strings
```

### DateTime

```typescript
v.datetime()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .after(new Date()) // DateTime must be after the specified date
  .before(new Date())  // DateTime must be before the specified date
  .between(new Date(), new Date())  // DateTime must be between the specified start and end dates
  .todayOrAfter()    // DateTime must be today or after today
  .todayOrBefore()   // DateTime must be today or before today
  .past()            // DateTime must be in the past
  .future()          // DateTime must be in the future
  .weekday()         // DateTime must be a weekday (Monday to Friday)
  .weekend()         // DateTime must be a weekend (Saturday or Sunday)
  .as<Type>('key')   // Same as for strings
```

### Date

```typescript
v.date()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .after(new Date()) // Date must be after the specified date
  .before(new Date())  // Date must be before the specified date
  .between(new Date(), new Date())  // Date must be between the specified start and end dates
  .todayOrAfter()    // Date must be today or after today
  .todayOrBefore()   // Date must be today or before today
  .past()            // Date must be in the past
  .future()          // Date must be in the future
  .weekday()         // Date must be a weekday (Monday to Friday)
  .weekend()         // Date must be a weekend (Saturday or Sunday)
  .leapYear()        // Date must be in a leap year
  .sameDayAs(new Date())  // Date must be the same day as the specified date
  .as<Type>('key')   // Same as for strings
```

### Time

```typescript
v.time()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .after(new Date()) // Time must be after the specified time
  .before(new Date())  // Time must be before the specified time
  .between(new Date(), new Date())  // Time must be between the specified start and end times
  .nowOrAfter()      // Time must be now or after now
  .nowOrBefore()     // Time must be now or before now
  .past()            // Time must be in the past
  .future()          // Time must be in the future
  .within24Hours()   // Time must be within the next 24 hours
  .as<Type>('key')   // Same as for strings
```

### Boolean

```typescript
v.boolean()
  .undefined()       // Allows `undefined`
  .required()        // Requires a value
  .true()            // Value must be `true`
  .false()           // Value must be `false`
  .equals(true)      // Value must be equal to `true`
  .equals(false)     // Value must be equal to `false`
  .as<Type>('key')   // Same as for strings
```

### Arrays

```typescript
v.array()
  .required()        // Requires a value
  .length(5)         // Array must have a length of 5
  .min(5)            // Minimum length required is 5
  .max(10)           // Maximum length allowed is 10
  .has("value")      // Array must include "value"
  .hasAll(["value1", "value2"])  // Array must include all of: value1, value2
  .hasAny(["value1", "value2"])  // Array must include any of: value1, value2
  .hasNone(["value1", "value2"]) // Array must include none of: value1, value2
  .some(predicate)   // Array matches the given predicate
  .every(predicate)  // Every element in the array matches the given predicate
```

### Custom Validation Rule

`.onError()` allows for custom error handling tailored to specific validation scenarios. This method accepts an object of type `ValidatorFnConfig<FieldType, ObjectType>`, which provides a structured way to define validation functions and associated error messages.

- **`error`**: This field specifies the validation function. It accepts parameters:
    - `value`: The current value of the field being validated.
    - `container` (optional): The object containing the field being validated.

  The function returns `true` if validation fails (i.e., an error condition is detected), and `false` otherwise.

- **`message`**: Optionally, you can specify an error message associated with the validation function. This can be a string or a function returning a string, allowing for dynamic error messages based on validation outcomes.

### Custom Validator Method

For types not covered by predefined validators, `v.custom<Type>()` allows you to create custom validators with tailored validation logic.

```typescript
v.custom<MyType>()
  .onError({
    error: (value): boolean => false, // Custom validation function returning `false` if validation fails
    message: "Custom error message" // Optional error message associated with the validation function
  })
  .onError({...}) // You can define multiple custom error handlers as needed
```

Using `v.custom<Type>()`, you can implement specialized validation rules specific to your application's requirements, ensuring robust validation across various data types and scenarios.

## Define Rules

### Simple Fields

You can define validation rules for simple fields using the `items` property of the [ValidatorConfig](#config-param-validatorconfig). This property accepts an object where you specify the fields to validate. The object should include only the fields of the type passed to [`v.validator<Type>`](#vvalidatortype-tcontext--). Each field is of type `ItemType`.

```typescript
type ItemType<T, TContext> = {
  [K in keyof T]?: TypeValidator<T[K]> | TypeValidatorWithContext<T[K], TContext>[];
}
```

> **Note:** `TypeValidatorWithContext` is used to define validation rules that depend on contextual information. For example, validations based on the [context](#context-validation) of the application or specific data dependencies.

#### Defining Validation Rules for Simple Fields

Here's how you can define validation rules for individual fields:

```typescript
{
  fieldName: v.validatorMethod.rule1().rule2().onError(...)
}
```

In this structure:

- `validatorMethod` refers to predefined methods provided by the library (`v`) to create `TypeValidator` objects containing validation rules.
- `rule1`, `rule2`, etc., are methods or functions chained together to specify validation criteria such as required fields, string length, format, etc. [(read more)](#validator-methods)

This approach allows you to configure detailed validation requirements for each field in your data type, ensuring data integrity and consistency in your application.

#### Example

```typescript
v.validator<User>({
  id: 'validator id',
  items: {
    username: v.string().required(),
    age: v.number().positive(),
    password: v.string().onError({
      error: (value) => {
        // Custom validation logic to ensure password complexity
        return true;
      },
      message: 'Password must be complex'
    })
  }
})
```

### Nested Fields

To define rules for nested objects in your data, there are two approaches:

#### 1. Using the `nested` Property

One way to validate nested objects is to create their own validators and then pass them in the `nested` property of the [ValidatorConfig](#config-param-validatorconfig).

```typescript
const childValidator = v.validator<ChildType>({
  items: {
    name: v.string().required(),
    age: v.number().positive()
  }
});

v.validator<ParentType>({
  nested: {
    child: childValidator
  }
});
```

In this example:

- `childValidator` is created to validate the `ChildType`, specifying rules for fields like `name` and `age`.
- The `v.validator<ParentType>` creates a validator for `ParentType`, where the `nested` property includes `child: childValidator`.
- This setup ensures that when validating a `ParentType` object, the `child` property will be validated according to the rules defined in `childValidator`.

Using this approach allows for modular and reusable validation logic, especially useful when dealing with complex data structures that include nested objects. It promotes code organization and maintains clear separation of validation rules for different parts of your data model.

#### 2. Using the `items` Property

Another approach to validate nested objects is by using `v.custom()` within the `items` property of the [ValidatorConfig](#config-param-validatorconfig). This method allows you to validate nested objects without needing to create separate validators for them.

```typescript
v.validator<ParentType>({
  items: {
    child: v.custom<ChildType>().onError({
      error: (value) => {
        // Custom validation logic for the nested object 'child'
        // Example: Checking if 'child' object meets specific criteria
        return !value.name || value.age < 0;
      },
      message: 'Error: Invalid child object'
    })
  }
});
```

In this example:

- `v.validator<ParentType>` creates a validator for `ParentType`.
- The `items` property defines validation rules for fields directly within `ParentType`.
- `child: v.custom<ChildType>()` specifies that the `child` property should be validated using a custom validator for `ChildType`.
- `.onError({ ... })` allows customization of error handling for the nested object validation.
    - The `error` function defines custom logic to validate the `child` object. Here, it checks if `child.name` exists and `child.age` is not negative.
    - The `message` provides an error message when validation fails for the nested object.

This approach is useful when you prefer to define validation rules inline within the main validator configuration, especially for nested objects that do not require extensive validation or are context-specific. It simplifies the structure by consolidating all validation logic within a single validator definition.

## Validator API

The `v.validator<T>()` method returns an instance of `Validator<T>`, the primary class of this library designed for comprehensive data validation. This class provides a robust set of methods and options to effectively manage and validate your data structures.

### Properties

| Property   | Description                                                                                           |
|------------|-------------------------------------------------------------------------------------------------------|
| **items**  | Retrieves the validation items to inspect their status, results, or to control them programmatically. |
| **nested** | Accesses nested validations to manage their status, results, or to control them as needed.            |

### Methods

| Method                                 | Description                                                                                                           |
|----------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| **options(options: ValidatorOptions)** | Updates the validator's configuration options after instantiation. [See options](#validator-options)                  |
| **allGood()**                          | Checks if all validations pass. Returns `true` if all validations are successful, otherwise `false`.                  |
| **applyAll()**                         | Executes all defined validations on the items specified within the validator configuration.                           |
| **applyAllAsync()**                    | Asynchronously applies all validations on the items specified within the validator.                                   |
| **reset()**                            | Resets the state of validations, clearing all previous results and errors.                                            |
| **init(getter: () => T)**              | Initializes the validator with a `getter` function to retrieve the latest state of the data to be validated.          |
| **withContext(context: TContext)**     | Provides a context object to the validator, enabling contextual validations.                                          |
| **validate(data?: T)**                 | Synchronously validates the provided object or uses the current `getter` value if no argument is provided.            |
| **validateInfo(data?: T)**             | Similar to `validate(data?)`, but returns an object containing the validation status and detailed results.            |
| **validateThrow(data?: T)**            | Similar to `validate(data?)`, but throws an error if any validation fails, providing comprehensive error information. |
| **import(errors: ValidatorResult)**    | Imports a list of errors into the validator to manage or display validation failures effectively.                     |

The `Validator<T>` class offers a versatile and powerful solution for validating complex data structures. By leveraging its methods and properties, developers can ensure data integrity, manage validation outcomes effectively, and handle validation errors with precision. Whether validating single objects or batches, the `Validator` class provides the flexibility and reliability required for robust data validation in various application scenarios.

## ValidatorItem API

The `ValidatorItem<T>` class is designed to encapsulate the validation state and behavior for individual properties within data structures. It integrates seamlessly with validation methods such as `v.string()`, `v.number()`, `v.boolean()`, `v.array()`, and `v.custom<T>()`, providing comprehensive management and access to validation results.

| Property/Method              | Description                                                                                                       |
|------------------------------|-------------------------------------------------------------------------------------------------------------------|
| **`valid`**                  | Returns `true` if the value is valid, `false` if invalid, and `undefined` if not yet validated.                   |
| **`name`**                   | The name of the field or property associated with this `ValidatorItem`.                                           |
| **`message`**                | The error message associated with validation failures.                                                            |
| **`get(): T`**               | Retrieves the current value of the property being validated.                                                      |
| **`set(value: T)`**          | Updates the value of the property being validated.                                                                |
| **`error(message: string)`** | Marks the validation state of the item as `false` and sets the error message.                                     |
| **`reset()`**                | Resets the validation state of the item to `undefined`, allowing for re-evaluation during subsequent validations. |

The `ValidatorItem<T>` class provides a structured approach to managing validation states and results for individual properties within your data structures. By using these properties and methods, you can effectively handle validation outcomes, track field-specific errors, and ensure data integrity throughout your application. Integrate `ValidatorItem<T>` seamlessly with the validation methods offered by this library to enhance the reliability and accuracy of your data validation processes.

## Validator Options

The validator in this library offers customizable behavior through the 'options' object that can be passed during initialization in the `options` property config in [`v.validator()`](#vvalidatortype-tcontext--)

-`dev?: boolean`

- If set to `true`, enables debug mode for the validator. When enabled, debug messages are logged to the console to aid in the debugging process.
- **Default Value:** `false`

- `resultsType?: "array" | "object"`
    - Specify the type of structure used to store nested validation results.
        - `"array"`: Uses arrays to store nested validation results.
        - `"object"`: Uses objects to store nested validation results.
    - **Default Value:** `"object"`

The `ValidatorOptions` object allows you to tailor the behavior of the validator to suit your application's needs.

- Setting `dev` to `true` provides enhanced debugging capabilities by logging debug messages to the console.
- The `resultsType` option lets you choose between using arrays or objects to organize nested validation outcomes.
  providing flexibility based on your application requirements.
  Adjust these options to effectively manage and interpret validation results within your application.

## Validator Template

The `ValidatorTemplate<T, TContext>` class provides a convenient way to create reusable templates for validators in this library. This allows you to define validation configurations once and instantiate validators based on those configurations multiple times.

| Method                                  | Description                                                                                              |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------|
| **`instant(): Validator<T, TContext>`** | Creates and returns a new instance of `Validator<T, TContext>` based on the template configuration.      |
| **`batchValidate(...data: T[])`**       | Validates multiple objects simultaneously using the template configuration.                              |
| **`batchValidateThrow(...data: T[])`**  | Validates multiple objects using the template configuration and throws an error if any validation fails. |

### `v.template(config)`

The `template` function creates and returns an instance of `ValidatorTemplate<T, TContext>`, which encapsulates a validator template configuration. Use this function to define reusable validator templates that can be instantiated with specific data objects for validation.

- `config`: A configuration object (`ValidatorTemplateConfig<T, TContext>`) defining the settings and structure of the validator template.

> **Usage**: The `ValidatorTemplate` class and the `template` function simplify the process of creating and using validator templates. Define a template configuration using `template` and its associated methods to instantiate validators, validate multiple objects in batches, or handle validation errors effectively within your application.

## How To Validate Objects?

When validating objects, ensuring they conform to the expected schema is essential. Here, we present three methods for handling validation results, each offering a different approach to error handling and result management.

### 1. `validate()`: Simple Boolean Check

The `validate()` method returns a boolean value indicating whether the validation passed or failed. This method is straightforward and suitable when only the validation outcome is needed, without detailed information about the validation results.

```typescript
const result = userValidator.validate();

if (result) {
  console.log('Validation passed!');
} else {
  console.log('Validation failed.');
}
```

### 2. `validateInfo()`: Detailed Validation Results

The `validateInfo()` method returns an object with `success` and `results` properties. These results are of type `ValidatorResult`, providing detailed information about why the validation failed, enabling precise error handling.

```typescript
const validationResult = userValidator.validateInfo();

if (validationResult.success) {
  console.log('Validation passed!');
} else {
  console.log('Validation failed.');
  console.log('Validation errors:', validationResult.results);
}
```

### 3. `validateThrow()`: Throwing Errors on Validation Failure

The `validateThrow()` method throws a `BshValidationError` error if the validation fails. This method is useful for handling validation errors using exception handling mechanisms.

```typescript
try {
  userValidator.validateThrow();
  console.log('Validation passed!');
} catch (e) {
  const validationError = e as BshValidationError;
  console.log('Validation failed.');
  console.log('Validation errors:', validationError.results);
}
```

### Choosing Between `.init()` and `.validate(object)`

You can choose between `.init()` and `.validate(object)` based on your validation needs:

- **`.init()`:** Recommended for real-time validation scenarios, such as when object fields change (e.g., in HTML forms). Requires a function to retrieve the current object state.

- **`.validate(object)`:** Useful in backend applications where the entire object is available for validation before processing.

By leveraging these methods (`validate()`, `validateInfo()`, and `validateThrow()`), you can implement a robust and adaptable validation strategy that meets your application's validation requirements effectively.

## Access The Validation status

### `validateItem(fieldName: string): void`
Triggers validation for the specified field.

**Usage:**
```javascript
validator.validateItem('email');
```

### `itemMessage(fieldName: string): string | undefined`
Retrieves the validation message for the specified field.

**Usage:**
```javascript
const emailMessage = validator.itemMessage('email');
```

### `isItemValid(fieldName: string): boolean | undefined`
Checks if the specified field is valid.

**Usage:**
```javascript
const isEmailValid = validator.isItemValid('email');
```

These methods provide a simpler and more intuitive way to access validation results. They replace the need for deep property access, making your code cleaner and easier to maintain. The existing methods remain available for backward compatibility.

## How To Use Real-Time Validation?

Real-time validation is crucial for validating objects as they change dynamically, such as in user interfaces. This section outlines how to achieve real-time validation using the `init()` method to track object changes and validate individual properties using the Validator library.

### Steps to Implement Real-Time Validation

1. **Define Data Types:**

   Define TypeScript types for the objects you want to validate. For example:

   ```typescript
   type Profile = {
     fullname: string;
     age: number;
   };

   type User = {
     email: string;
     password: string;
     profile: Profile;
   };
   ```

2. **Declare Validators:**

   Create validators for each property and nested object using the Validator library:

   ```typescript
   const profileValidator = v.validator<Profile>({
     id: 'profileValidator',
     items: {
       fullname: v.string().required(),
       age: v.number().required().positive(),
     },
   });

   const userValidator = v.validator<User>({
     id: 'userValidator',
     items: {
       email: v.string().required().email(),
       password: v.string().required().min(8),
     },
     nested: {
       profile: profileValidator,
     },
   });
   ```

3. **Initialize Object State:**

   Use the `init()` method to initialize the validator with the current object state. This is essential for tracking changes and validating in real-time, especially useful in scenarios like form validations:

   ```typescript
   const user = new User();

   userValidator.init(() => user); // Initialize with a function to retrieve the current object state
   ```

4. **Validate Single Property:**

You can validate a single property using the validator's:

- `items.<property-name>.validate()` method
- `nested.<nested-property-name>.items.<property-name>.validate()` method.
- `.validateItem('property-name')`

This allows you to validate specific fields as they are updated in the UI:

 ```typescript
 // Example to validate the 'email' property
const emailValidatorItem = userValidator.items.email;

emailValidatorItem.validate();

// Get validation status and error message
const isValid = emailValidatorItem.valid;
const errorMessage = emailValidatorItem.message;

// Update validation state if needed
if (!isValid) {
  emailValidatorItem.error('Email is not valid!');
}
 ```

### Example Usage

Here's a complete example demonstrating real-time validation with the Validator library:

```typescript
// Define Data Types
type Profile = {
  fullname: string;
  age: number;
};

type User = {
  email: string;
  password: string;
  profile: Profile;
};

// Declare Validators
const profileValidator = v.validator<Profile>({
  id: 'profileValidator',
  items: {
    fullname: v.string().required(),
    age: v.number().required().positive(),
  },
});

const userValidator = v.validator<User>({
  id: 'userValidator',
  items: {
    email: v.string().required().email(),
    password: v.string().required().min(8),
  },
  nested: {
    profile: profileValidator,
  },
});

// Initialize Object State
const user = new User();

userValidator.init(() => user); // Initialize with a function to retrieve the current object state

// Validate a Single Property
const emailValidatorItem = userValidator.items.email;

// Simulate change and validation
user.email = 'invalid-email'; // Assume user input

emailValidatorItem.validate();

// Get validation status and error message
const isValid = emailValidatorItem.valid;
const errorMessage = emailValidatorItem.message;

// Get validation status of proprerty of nested object
const isAgeValid = userValidator.nested.profile.items.age.valid;
```

By following these steps, you can implement robust real-time validation for your application using the Validator library, ensuring data integrity and user experience consistency. Adjust validations and error handling according to your specific application requirements for seamless integration and functionality.

## Batch Validation: validate multi objects

to validate multiple objects, the library provides `batchValidate()` and `batchValidatethrow()` methods of [`Validator`](#validator-api), this method accept list of objects, of the same type, to be validated.

```typescript
validator.batchValidateThrow(object1, object2, object3);
```

## Async Validation

The Validator library supports asynchronous validation rules through the `onErrorAsync()` method, enabling seamless handling of asynchronous validation checks within your validation workflows.

### Example of Async Validation

Define async validation rules using the `onErrorAsync()` method:

```typescript
v.validator<User>({
  id: 'userValidator',
  items: {
    email: v.string().required().email().onErrorAsync({
      error: async value => {
        const isEmailInUse = await checkEmailInUse(value);
        return isEmailInUse;
      },
      message: 'The email is already in use!'
    }),
  }
});
```

To execute async validation rules, use the following methods:

- `validateAsync(data?)`
- `validateInfoAsync(data?)`
- `validateThrowAsync(data?)`

By using async validation rules and these methods (`validateAsync`, `validateInfoAsync`, and `validateThrowAsync`), you can efficiently handle asynchronous validation scenarios in your application, ensuring robust data validation and error handling. Adjust the async validation logic according to your specific application requirements for optimal performance and functionality.

> **Note:** using non async validation methods as `validate()` will ignore the async validation!

## Context Validation

Context validation involves altering the validation behavior based on additional information known as `context`. This contextual information influences how validation rules are applied or interpreted, allowing developers to tailor validation logic to specific scenarios or conditions.

### Context Type

The `v.validator<Type, TContext>()` function accepts two types: `Type` and `TContext`. The `TContext` type represents the context that will be passed to the validation rules. By default, `TContext` is of type `any`, as it is not required.

### Context Validation Rules

Using context validation rules allows developers to apply different validation logic based on the context. Below are three methods to implement context validation rules.

### Method 1: Static Context Values

In this method, specific validation rules are applied based on predefined context values.

```typescript
type SomeType = {
  startDate: Date,
}

type Context = {
  role: "admin" | "user"
}

v.validator<SomeType, Context>({
  id: "user validator",
  items: {
    startDate: [
      {ctx: {role: "admin"}, validations: v.date()},
      {ctx: {role: "user"}, validations: v.date().future()}
    ],
  }
})
```

### Method 2: Dynamic Context Evaluation

In this method, validation rules are applied based on a dynamic evaluation of the context.

```typescript
v.validator<SomeType, Context>({
  id: "user validator",
  items: {
    startDate: [
      {ctx: context => context.role == 'admin', validations: v.date()},
      {ctx: context => context.role == 'user', validations: v.date().future()}
    ],
  }
})
```

### Method 3: Context-Aware Validation

In this method, validation rules use the context within the validation logic itself, allowing for more complex and dynamic validation scenarios.

```typescript
v.validator<SomeType, Context>({
  id: "user validator",
  items: {
    startDate: v.date().onErrorCtx({
      error: (value, context) => {
        if (context.role == 'admin') {
          // some validation if the role is admin
          return true;
        }
        return false;
      },
      message: 'Start date validation failed based on role context.'
    })
  }
})
```

These methods provide flexibility in defining validation logic based on various contextual factors, enhancing the adaptability and precision of the validation process.

## Error Messages Customization

The library provides a flexible way to customize the error messages of the validation results. You can set your own error messages in three main ways: [Static Message](#static-messages), [Variants of Static Message](#placeholder-messages),
and [Dynamic Message](#dynamic-messages).

### Static Messages

Static messages are straightforward and do not change based on the input value or any external variables. You can provide static messages by using the optional argument of the validation methods, passing the message in the `message: string` property.

```TypeScript
v.string().required({message: "your costume message."})
v.number().min(10, {message: "your costume message."})
```

### Placeholder Messages

The library allows you to customize error messages dynamically using placeholders. Here are the placeholders you can use:

1. `%n`: Replaced by the `n` argument of the method.
2. `%val`: Replaced with the actual value of the validated field.
3. `%name`: Replaced with the name of the validated field.

#### 1. `%n`

The `%n` placeholder makes the error message more informative by incorporating method-specific parameters.

```typescript
v.number().min(10, {message: "Minimum value is %1."}) // Minimum value is 10.
v.number().range(10, 20, {message: "Value must be between %1 and %2."}) // Value must be between 10 and 20.
```

#### 2. `%val`

The `%val` placeholder provides context to the user by showing the invalid value within the error message.

```typescript
const validator = v.validator<{ username: string }>({
  items: {
    username: v.string()
      .min(10, {message: `'%val' must contain at least %1 characters!`})
  },
}).init(() => {
  return {
    username: "bshg"
  }
})

validator.validate()
console.log(validator.items.username?.message) // 'bshg' must contain at least 10 characters!
```

#### 3. `%name`

The `%name` placeholder includes the field name in the error message, providing clarity and specificity.

```typescript
const validator = v.validator<{ username: string }>({
  items: {
    username: v.string()
      .min(10, {message: `'%name' must contain at least %1 characters!`})
  },
}).init(() => {
  return {
    username: "bshg"
  }
})

validator.validate()
console.log(validator.items.username?.message) // 'username' must contain at least 10 characters!
```

Using these placeholders, you can create error messages that are both informative and contextually relevant, enhancing the user experience of your application.

### Dynamic Messages

Dynamic messages allow you to use functions to generate error messages based on external variables or complex logic. This approach is highly flexible and can adapt to changes in the environment. For this we use `messageFn: () => string` property.

```TypeScript
let role = "admin"

const validator = v.validator<{ username: string }>({
  items: {
    username: v.string()
      .min(10, {messageFn: () => `invalid '${role}' username!`})
  },
}).init(() => {
  return {
    username: "bshg"
  }
})

validator.validate()
console.log(validator.items.username?.message) // invalid 'admin' username!
```

### Combining Placeholder and Dynamic Messages

You can combine [Placeholder Message](#placeholder-messages) and [Dynamic Message](#dynamic-messages) to create sophisticated and detailed error messages.

```TypeScript
let role = "admin"

const validator = v.validator<{ username: string }>({
  items: {
    username: v.string()
      .min(10, {messageFn: () => `invalid '${role}' username! min lenght is %1.`})
  },
}).init(() => {
  return {
    username: "bshg"
  }
})

validator.validate()
console.log(validator.items.username?.message) // invalid 'admin' username! min lenght is 10.
```

## `import()` API

The `import()` method accepts the `ValidatorResult` object and sets the validation results to the validator. This API is used to pass validation results from one validator to another, which can be useful when transferring validation results from a server to a client.

- **Description:** Sets the validation results of another validator to the current validator.
- **Parameters:**
    - `results`: The validation results object to be imported.
- **Usage:**
  ```typescript
  const userValidator = v.validator<User>({
    items: {
      username: v.string().required(),
      password: v.string().required()
    },
  }).init(() => item);

  const userValidator2 = v.validator<User>({
    items: {
      username: v.string(),
      password: v.string()
    }
  }).init(() => item2);

  try {
    userValidator.validateThrow(); // Validate the object
  } catch (e) {
    // Pass the validation results to the second validator
    userValidator2.import((e as BshValidationError).results);
  }
  ```

The `import()` method is particularly useful when you need to transfer validation results from one validator to another. It facilitates the propagation of validation errors between different parts of your application, ensuring consistent handling of validation outcomes. This method is commonly used when performing validation on the server side and relaying the results to the client for display or further processing.

## Multi-Language Support for Validation Messages

Your validation library now supports error messages in multiple languages. Users can define error messages in the following supported languages:

- English (`en`)
- French (`fr`)
- Arabic (`ar`)

### Configuration

#### Setting the Default Locale

To set the default locale for your validation messages, configure it during the initial setup. Here’s how:

```typescript
import {v, m} from '@bshg/validation';

// Set the default locale to French
v.configure({
  validatorOptions: {/**/},
  regex: {/**/},
  local: "ar" // Set the default locale to Arabic
});
```

#### Changing the Locale at Runtime

You can change the locale dynamically at runtime using the `changeLocal(local)` method provided by the `m` module.

```typescript
import {v, m} from '@bshg/validation';

// Change the locale to Arabic
m.changeLocal('ar');
```

### Example Usage

Here’s a complete example demonstrating how to configure and change locales for validation messages:

```typescript
import {v, m} from '@bshg/validation';

// Initial configuration with French as the default locale
v.configure({
  validatorOptions: {/**/},
  regex: {/**/},
  local: "fr" // Set the default locale to French
});

// Validate some data (error messages will be in French)
const validationResult = v.validator<{ email: string }>({
  items: {email: v.string().required()}
}).validateInfo();
console.log(validationResult); // Outputs error messages in French

// Change the locale to Arabic at runtime
m.changeLocal('ar');

// Validate the same data again (error messages will now be in Arabic)
const validationResultAr = v.validator<{ email: string }>({
  items: {email: v.string().required()}
}).validateInfo();
console.log(validationResultAr); // Outputs error messages in Arabic

// Change the locale to English at runtime
m.changeLocal('en');

// Validate the same data again (error messages will now be in English)
const validationResultEn = v.validator<{ email: string }>({
  items: {email: v.string().required()}
}).validateInfo();
console.log(validationResultEn); // Outputs error messages in English
```

### Supported Locales

The library currently supports the following locales:

- **English** (`en`)
- **French** (`fr`)
- **Arabic** (`ar`)

With the new multi-language support, you can switch between different languages for your validation messages, making your application more accessible to a wider audience. Use the configuration and runtime methods provided to customize the validation messages to suit your application's needs.

## Overriding Default Values

### Overriding Options Globally

You can customize the default validation options globally using the `v.configure()` method. This method accepts an object where you can specify the options you want to override. Here's how you can do it:

```typescript
v.configure({
  validatorOptions: {
    dev: true,
    warn: true,
    resultsType: "array"
  },
  regex: {
    EMAIL: /regex/
  },
  local: 'en'
})
```

In the configuration object:

- **`validatorOptions`**: This property allows you to specify various options for validation. If you don't provide this property, the default options will be used.
- **`regex`**: You can override or define custom regex patterns for specific validation rules.
- **`local`**: This property sets the default locale for validation messages.

Here are the options that you can override:

| Option        | Explanation                                                                         | Default Value |
|---------------|-------------------------------------------------------------------------------------|---------------|
| `dev`         | Enables development mode which provides additional debugging information.           | `false`       |
| `warn`        | If set to `true`, warnings will be shown for non-critical issues during validation. | `false`       |
| `resultsType` | Defines the format of the validation results. Can be `array` or `object`.           | `object`      |

By customizing these options, you can tailor the validation behavior according to your application's specific requirements.

### Overriding Options For A Specific Validator

While you can set global options using `v.configure()`, sometimes you may need to customize options for a specific validator instance. This allows you to fine-tune validation behavior according to the unique requirements of each validator.

To override default options for a specific validator, provide the `options` property in the validator object during its creation.

Here's an example:

```typescript
const userValidator = v.validator<User>({
  id: "userValidator",
  items: {
    username: v.string().required(),
    password: v.string().required()
  },
  options: { // Customize options for this validator instance
    dev: true,
    warn: false,
    resultsType: "object",
  }
})
```

In this example:

- The `dev` option is set to `true`, enabling development mode for this validator instance. This provides additional debugging information.
- The `warn` option is set to `false`, meaning warnings for non-critical issues during validation will be suppressed.
- The `resultsType` option is set to `"object"`, defining the format of the validation results for this validator as an object.

By overriding options for specific validators, you can precisely control their behavior to meet your application's requirements. This allows for greater flexibility and customization in validation logic.

### Overriding Regex Values

This library provides the flexibility to override default regex values used for validating string data, such as email addresses, phone numbers, URLs, and more. You can customize these regex patterns to better suit your specific validation requirements.

#### Using `v.configure()` Method:

You can override default regex values globally by using the `v.configure()` method. Provide the desired regex patterns within the `regex` property of the configuration object.

```typescript
v.configure({
  validatorOptions: {/**/},
  regex: {
    EMAIL: /email@[a-z]+\.[a-z]+/i,
    PHONE: /\+\d{1,3}\(\d{3}\)\d{3}-\d{4}/,
    // Add or override other regex values as needed
  }
})
```

#### Directly in `v.regex` Container:

Alternatively, you can directly modify the `v.regex` container to override default regex values. This method offers more flexibility and control over individual regex patterns.

```typescript
import {v} from '@bshg/validation'

v.regex.EMAIL = /email@[a-z]+\.[a-z]+/i
v.regex.PHONE = /\+\d{1,3}\(\d{3}\)\d{3}-\d{4}/
// Add or override other regex values as needed
```

#### Default Regex Patterns:

Here are the default regex patterns used for various validations:

| Regex Name   | Regex Pattern                                                                                             | Used in                     |
|:-------------|:----------------------------------------------------------------------------------------------------------|:----------------------------|
| EMAIL        | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`                                                                            | `v.string().email()`        |
| PHONE        | `/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im`                                           | `v.string().phone()`        |
| NUMERIC      | `/^[0-9]+$/`                                                                                              | `v.string().numeric()`      |
| ALPHA        | `/^[a-zA-Z]+$/`                                                                                           | `v.string().alpha()`        |
| ALPHANUMERIC | `/^[a-zA-Z0-9]+$/`                                                                                        | `v.string().alphanumeric()` |
| URL          | `/^(ftp\|http\|https):\/\/[^ "]+$/`                                                                       | `v.string().url()`          |
| DATE         | `/^\d{4}-\d{2}-\d{2}$/`                                                                                   | `v.string().date()`         |
| TIME         | `/^([01]\d\|2[0-3]):([0-5]\d):([0-5]\d)$/`                                                                | `v.string().time()`         |
| HEX_COLOR    | `/^#?([a-fA-F0-9]{6}\|[a-fA-F0-9]{3})$/`                                                                  | `v.string().hexColor()`     |
| CREDIT_CARD  | `/^(?:3[47]\d{2}([\s-]?)\d{6}\1\d{5}\|(?:4\d\|5[1-5]\|65)\d{2}\d{5}\d{4}\|6011([\s-]?)\d{4}\d{4}\d{4})$/` | `v.string().creditCard()`   |
| HTML_TAG     | `/<("[^"]*"\|'[^']*'\|[^'">])*>/`                                                                         | `v.string().htmlTag()`      |
| BASE64       | `/[^A-Za-z0-9+/=]/`                                                                                       | `v.string().base64()`       |

Feel free to modify these regex patterns according to your specific validation needs.

### Overriding Localization

Localization is essential for providing error messages and validation feedback in different languages or cultural contexts. This feature allows you to customize the language used for validation messages, making your application more accessible to users from diverse backgrounds.

1. **Using `v.configure()` Method:**
   When using `v.configure()`, you can specify the desired locale directly in the configuration object. This will set the default language for all validation messages generated by the library.

    ```typescript
    v.configure({
      validatorOptions: {/**/},
      regex: {/**/},
      local: "ar" // Set the default locale to Arabic
    })
    ```

2. **Using `m.changeLocal()` API:**
   Alternatively, you can dynamically change the locale at runtime using the `m.changeLocal()` method provided by the library. This allows you to switch languages based on user preferences or application settings.

    ```typescript 
    import {m} from '@bshg/validation'

    m.changeLocal("ar") // Change the locale to Arabic
    ```

By overriding the localization settings, you can ensure that validation messages are displayed in the appropriate language for your users. This enhances the user experience and helps improve accessibility for a global audience.

## What is New in 0.5.5

- add validator status to define the status of the validator after being executed [#commet](https://github.com/bsh-generator/bshg_validation_ts/tree/7901e77f88f88bf047af7ff9dc78a62363d39abb)
- update the loggers [#commet](https://github.com/bsh-generator/bshg_validation_ts/tree/a8476b8b069e5eeab001203c464e13a45401ccd2)
- start using tests in the library
- Simplify Access to Validation Status and Messages [#2](https://github.com/bsh-generator/bshg_validation_ts/issues/2)
