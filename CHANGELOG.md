
# Changelog

## Previous Releases

### 0.6.5

- introduce inline validator, to validate primitive values:
````ts
import {v, m} from 'src'

const emailValidator = v.string().required().email().build();

emailValidator.apply("test.com")

console.log(emailValidator.valid) // false
console.log(emailValidator.message) // Invalid email format
````

- fix some bugs

### 0.6.0

- add validator status to define the status of the validator after being executed [#commet](https://github.com/bsh-generator/bshg_validation_ts/tree/7901e77f88f88bf047af7ff9dc78a62363d39abb)
- update the loggers [#commet](https://github.com/bsh-generator/bshg_validation_ts/tree/a8476b8b069e5eeab001203c464e13a45401ccd2)
- start using tests in the library
- Simplify Access to Validation Status and Messages [#2](https://github.com/bsh-generator/bshg_validation_ts/issues/2)

### 0.5.5

- address the issue with import and fix it [#1](https://github.com/bsh-generator/bshg_validation_ts/issues/1)

### 0.5.0

- add `onChange()` method to be executed when the validator status changes
- fix some bugs

### 0.4.1

- update the docs

### 0.4.0

- **Improved Documentation**: Clearer and more comprehensive.

- **Async Validation**:
  - Support for asynchronous validation rules with `onErrorAsync()`.
  - Async batch validations for multiple objects.

- **Context Validation**:
  - Alter validation behavior based on context information.
  - Dynamic rules based on specific conditions.

- **Unified Error Messages**:
  - Single `message` property for both string and function messages.

- **Bug Fixes**:
  - Stability and performance improvements.
  - Enhanced date comparison logic.

### 0.3.2

- make `v.array<Type>()` accept undefinable types
- fix some issues

### 0.3.1

- change the config type in `v.template(config)` to accept nested validator as templates.
- apply the local in other types.

### 0.3.0

- remove `validationResult` from validator options, and replace it with methods for more type safe for the return type of the validation.
- Develop new way to validate:
  - `.validate(): boolean`: return true if the validation passes.
  - `.validateInfo(): {success, results}`: return object with the validation details if it fails.
  - `.validateThrow()`: throw an Error of type `BshValidationError` if validation fails.
- update validate methods to accept object to be validated, as you can still using `.init()`
- Introduce `v.template<Type>()`: create template for validators to instantiate validators from it.
- Introduce `validator.options(ValidatorOptions)`: override the default options.
- Introduce `Batch Validation`: Enable batch validation of multiple objects or fields at once, returning aggregated results.
- Provide multi-language support for validation messages, allowing users to define error messages in various languages.

### 0.2.0

- Added `.as()` method to the following validators: `v.string()`, `v.number()`, `v.boolean()`, `v.time()`, `v.date()`, `v.datetime()`. This method allows comparison with a property of the parent object.
- Introduced `.onError<ParentType>()` method to enable custom validation based on the value of the field and the parent object.
- Added `%name` placeholder to dynamically include the field name in error messages.

These updates enhance the functionality and flexibility of the validation library, providing more options for custom validations and error message customization.

### 0.1.1

- add dynamic messages: now you can use functions for you validation messages
- add `%val` to use it in messages string to be replaced with actual field value.
- rename `.add()` -to add costumes validations- to `.onError()`
- fix issue of marking the validator functions type as undefinable by default:
  - make validator function use generics to set the type as undefinable `v.string<string | undefined>()`. by default is take type `string`, and the same for the other.
  - add `.undefined()` to validator functions to mark types as undefinable.

### 0.1.0

#### Features:
- Upgraded the library to use functions instead of extending classes, enhancing flexibility and ease of use.
- Expanded validation methods to cover various types, increasing validation options.
- Introduced the `v.costume<T>()` method, enabling users to create validators for custom types.
- Added `v.validator<T>()` method for creating validators for custom types without extending `Validator<T>` class.
- Implemented automatic getter and setter for the `ValidatorItem` class, simplifying usage.
- Introduced `v.configure()` method for configuring the library according to user preferences.
- Made regex and error messages configurable, providing customization options.
- Enhanced compatibility with both front-end and back-end projects for seamless integration.
- Introduced `.import(results)` method for importing validation results from backend to frontend, facilitating sharing of results across environments.

#### Improvements:
- Improved documentation and logging for better clarity and understanding.
- Enhanced error handling and reporting for smoother user experience.
- Optimized performance for faster validation processes.
- Streamlined code structure for better maintainability and readability.

These updates aim to provide users with a more versatile and customizable validation library, ensuring smoother integration and enhanced validation capabilities across various project environments.

### 0.0.7

first version of the library, with complete functionality.
