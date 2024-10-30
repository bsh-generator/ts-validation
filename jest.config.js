module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  "testRegex": "__tests__/.*\\.test\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  moduleNameMapper: {
    "^@bshg/validation(.*)$": "<rootDir>/src$1",
  },
};
