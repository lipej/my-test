export default {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: {
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@test/(.*)': '<rootDir>/test/$1',
    '@presentation/(.*)': '<rootDir>/src/presentation/$1',
    '@app/(.*)': '<rootDir>/src/application/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
    '@infra/(.*)': '<rootDir>/src/infra/$1'
  },
  collectCoverageFrom: ['src/**/*.ts', '!test/**/*.ts']
};
