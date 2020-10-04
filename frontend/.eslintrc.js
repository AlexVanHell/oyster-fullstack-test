module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		createDefaultProgram: true,
	},
	plugins: ['@typescript-eslint/eslint-plugin'],
	extends: [
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'prettier',
		'prettier/@typescript-eslint',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/array-type': 'warn',
		'@typescript-eslint/explicit-member-accessibility': [
			'warn',
			{
				accessibility: 'explicit',
				overrides: {
					accessors: 'no-public',
					constructors: 'no-public',
					methods: 'no-public',
					properties: 'off',
					parameterProperties: 'explicit',
				},
			},
		],
		'@typescript-eslint/member-ordering': 'warn',
	},
	settings: {
		'eslint.workingDirectories': [
			{ directory: './tsconfig.json', changeProcessCWD: true },
		],
		react: {
			version: 'detect',
		},
	},
};
