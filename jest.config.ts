import { Config } from '@jest/types';

const config: Config.InitialOptions = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'mjs'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js,jsx}',
        '!src/**/*.d.ts',
        '!src/**/*.spec.{js,ts}',
        '!src/**/*.test.{js,ts}',
    ],
    roots: ['<rootDir>/src'],
};

export default config;
