module.exports = {
	plugins: ['react', 'flowtype', 'prettier'],
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:flowtype/recommended',
		'plugin:prettier/recommended',
		'prettier/react'
	],
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	env: {
		es6: true,
		browser: true,
		node: true,
		mocha: true
	},
	parser: 'babel-eslint',
	rules: {
		'prettier/prettier': 'error'
	}
};
