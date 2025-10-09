import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';
import stylistic from '@stylistic/eslint-plugin';


export default defineConfig([
	globalIgnores([ 'build/**/*' ]),
	{
		files: [ '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
		plugins: { '@stylistic': stylistic },
		extends: [ '@stylistic/all' ],
		rules: {
			'@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
			'@stylistic/array-bracket-spacing': [ 'error', 'always', {
				objectsInArrays: false,
				arraysInArrays: false,
			}],
			'@stylistic/array-element-newline': [ 'error', 'consistent' ],
			'@stylistic/brace-style': [ 'error', 'allman' ],
			'@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
			'@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
			'@stylistic/function-paren-newline': [ 'error', 'multiline-arguments' ],
			'@stylistic/indent': [ 'error', 'tab' ],
			'@stylistic/linebreak-style': [ 'error', 'windows' ],
			'@stylistic/no-extra-parens': [ 'error', 'all', { ignoreJSX: 'all' }],
			'@stylistic/object-curly-spacing': [ 'error', 'always', {
				arraysInObjects: false,
				objectsInObjects: false,
			}],
			'@stylistic/operator-linebreak': [ 'error', 'before' ],
			'@stylistic/padded-blocks': [ 'error', 'never' ],
			'@stylistic/quote-props': [ 'error', 'as-needed' ],
			'@stylistic/quotes': [ 'error', 'single' ],
		},
	},
	{
		files: [ '**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}' ],
		plugins: { js },
		extends: [ 'js/recommended' ],
		languageOptions: { globals: globals.browser },
	},
	tseslint.configs.recommended,
	{
		files: [ '**/*.json' ],
		plugins: { json },
		language: 'json/json',
		extends: [ 'json/recommended' ],
	},
	{
		files: [ '**/*.json5' ],
		plugins: { json },
		language: 'json/json5',
		extends: [ 'json/recommended' ],
	},
	{
		files: [ '**/*.md' ],
		plugins: { markdown },
		language: 'markdown/gfm',
		extends: [ 'markdown/recommended' ],
	},
	{
		files: [ '**/*.css' ],
		plugins: { css },
		language: 'css/css',
		extends: [ 'css/recommended' ],
	},
]);
