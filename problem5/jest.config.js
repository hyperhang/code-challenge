module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(ts|tsx)\$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
};