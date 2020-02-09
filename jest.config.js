module.exports = {
  rootDir: '.',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.html$': 'html-loader-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest.transformer-for-testing.js',
  },
  testURL: 'http://localhost/',
  testMatch: ['<rootDir>/deploy/**/*.spec.ts', '<rootDir>/src/**/*.spec.ts'],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.ts',
    '<rootDir>/src/libs/**/*.ts',
    '<rootDir>/src/scripts/**/*.ts',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/specs/',
    '/test-helpers/',
    '/testing/',
    '/tests/',
  ],
  coverageReporters: ['lcov', 'text-summary'],
  verbose: true,
  preset: 'ts-jest',
  restoreMocks: true,
};
