module.exports = {
    env: {
        browser: true,
        es6: true,
        jest: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: [
        'prettier',
        '@typescript-eslint'
    ],
    rules: {
        'prettier/prettier': ['error', {
            singleQuote: true,
            parser: 'typescript',
            semi: false,
            tabWidth: 4
        }],
        semi: ["error", "never"],
        'no-unused-vars': ['off'],
    }
};