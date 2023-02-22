/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig.json");

// const fs = require("fs");
// const { compilerOptions } = JSON.parse(fs.readFileSync("./tsconfig.json"));

module.exports = {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    transform: { "^.+\\.(ts|tsx)$": "ts-jest" },
    testEnvironment: "node",
    testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    preset: "ts-jest",

    // this enables us to use tsconfig-paths with jest
    modulePaths: [compilerOptions.baseUrl],

    roots: ["."],
    resetMocks: true,
    coverageProvider: "v8",
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.router.ts",
        "!src/**/handler.ts",
        "!src/**/index.ts",
    ],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json",
        },
    },
};
