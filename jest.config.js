module.exports = {
  rootDir: '.',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(fp-ts)/)'],
  testURL: 'http://localhost/',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/src/**/*.spec.ts'],
  coveragePathIgnorePatterns: ['/node_modules/', '/specs/', '/test-helpers/', '/testing/', '/tests/'],
  coverageReporters: ['lcov', 'text-summary'],
  verbose: true,
  preset: 'ts-jest',
  restoreMocks: true,
};
