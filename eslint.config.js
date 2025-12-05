import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    { ignores: ['dist', 'src/packages'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 'latest', // -> this relates to the source code, will use automatic version detection
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react: reactPlugin,
            prettier: prettier,
            import: importPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            ...js.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'error',
            'react-hooks/exhaustive-deps': 'error',
            '@typescript-eslint/no-empty-interface': [
                'error',
                {
                    allowSingleExtends: true,
                },
            ],
            'import/no-unresolved': ['error'],
            '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
            '@typescript-eslint/no-explicit-any': 'off',
            'no-unexpected-multiline': ['error'],
            'import/no-restricted-paths': [
                'error',
                {
                    basePath: 'src',
                    zones: [
                        // Common cannot import from modules directory
                        {
                            target: './common/**/*',
                            from: './modules/**/*',
                        },
                        // Modules cannot import from other modules
                        {
                            target: './modules/explore/**/*',
                            from: './modules/checkout/**/*',
                        },
                        {
                            target: './modules/explore/**/*',
                            from: './modules/decide/**/*',
                        },
                        {
                            target: './modules/checkout/**/*',
                            from: './modules/explore/**/*',
                        },
                        {
                            target: './modules/checkout/**/*',
                            from: './modules/decide/**/*',
                        },
                        {
                            target: './modules/decide/**/*',
                            from: './modules/explore/**/*',
                        },
                        {
                            target: './modules/decide/**/*',
                            from: './modules/checkout/**/*',
                        },
                        // Common cannot import from any other Apps directory
                        {
                            target: './Apps/AppsCommon',
                            from: './Apps',
                            except: ['./AppsCommon'],
                        },
                        {
                            target: './Apps/FwaasFullApp',
                            from: './Apps',
                            except: ['./AppsCommon', './FwaasFullApp'],
                        },
                        {
                            target: './Apps/FwaasLightApp',
                            from: './Apps',
                            except: ['./AppsCommon', './FwaasLightApp'],
                        },
                        {
                            target: './Apps/CgnsApp',
                            from: './Apps',
                            except: ['./AppsCommon', './CgnsApp'],
                        },
                        {
                            target: './Apps/Apps.init.ts',
                            from: ['./Apps/FwaasLightApp', './Apps/FwaasFullApp', './Apps/CgnsApp'],
                        },
                        {
                            target: 'Apps/FwaasFullApp/FwaasFullCommon/**/*',
                            from: 'Apps/FwaasFullApp/FwaasFullPages/**/*',
                        },
                        {
                            target: 'Apps/FwaasLightApp/FwaasLightCommon/**/*',
                            from: 'Apps/FwaasLightApp/FwaasLightPages/**/*',
                        },
                        {
                            target: 'General/**/*',
                            from: '!(General)/**/*',
                        },
                    ],
                },
            ],
            'no-unused-vars': 'off', // see @typescript-eslint/no-unused-vars
            eqeqeq: ['error', 'always'],
            'no-var': 'error',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['**/AppsCommon/Route/navigate.ts'],
                            message: 'Use RouteService instead of importing history directly.',
                        },
                    ],
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: {
                    alwaysTryTypes: true,
                },
            },
        },
    },
);

