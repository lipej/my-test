export default {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "node",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  collectCoverageFrom: ["**/*.ts", "!test/**/*.ts", "!**/*.config.ts"],
};
