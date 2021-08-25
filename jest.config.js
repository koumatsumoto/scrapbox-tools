module.exports = {
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  globals: {
    'ts-jest': {
      'ts-config': {
        ...require('./tsconfig.json').compilerOptions,
        sourceMap: true,
      },
    },
  },
  transform: { '^.+\\.ts$': 'ts-jest' },
  testURL: 'http://localhost/',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/specs/', '/test-helpers/', '/testing/', '/tests/'],
  coverageReporters: ['lcov', 'text-summary'],
  verbose: true,
  preset: 'ts-jest',
  restoreMocks: true,
};
