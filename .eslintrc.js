module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-async-promise-executor": "error",
        "array-callback-return": "error",
        "no-empty-function": ["error", { allow: ["constructors"] }],
        "no-implied-eval": "error",
        "no-var": "error",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    String: {
                        message: "Use string instead",
                        fixWith: "string",
                    },

                    Function: "Avoid this type unless it's absolutely necessary. Create custom type instead.",
                },
            },
        ],
        "no-console": "error",
    },
};
