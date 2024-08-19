export class BshUndefinedObject extends Error {
  constructor(name: string) {
    super(`Object of validator '${name}' is not defined!`);
  }
}
