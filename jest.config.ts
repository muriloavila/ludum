import type { Config } from 'jest'

const config: Config = {
    roots: ['<rootDir>/test'],
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/test/**/*.ts'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '.+\\.ts$': 'ts-jest'
    }
}

export default config