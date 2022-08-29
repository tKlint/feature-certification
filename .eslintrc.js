module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        amd: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'import/no-unresolved': 0,
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': 'error'
    }
};
