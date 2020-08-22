module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      modules: true,
      blockBindings: true,
      arrowFunctions: true,
      objectLiteralShorthandMethods: true,
      objectLiteralShorthandProperties: true,
      templateStrings: true,
      classes: true,
      jsx: true,
    },
  },

  extends: [
    '@metamask/eslint-config',
    '@metamask/eslint-config/config/nodejs',
    '@metamask/eslint-config/config/mocha',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],

  plugins: ['babel', 'react', 'json', 'import', 'prettier'],

  globals: {
    $: 'readonly',
    document: 'readonly',
    QUnit: 'readonly',
    window: 'readonly',
  },

  rules: {
    // Prettier changes and reasoning

    'prettier/prettier': 'error',

    // Our usage of spaces before *named* function parens is unusual, and
    // doesn't match the prettier spec. prettier does not offer an option
    // to configure this
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' },
    ],
    // 'lines-around-comment': 'error',
    // Our eslint config has the default setting for this as error. This
    // include beforeBlockComment: true, but in order to match the prettier
    // spec you have to enable before and after blocks, objects and arrays
    // https://github.com/prettier/eslint-config-prettier#lines-around-comment
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    // Prettier has some opinions on mixed-operators, and there is ongoing work
    // to make the output code clear. It is better today then it was when the first
    // PR to add prettier. That being said, the workaround for keeping this rule enabled
    // requires breaking parts of operations into different variables -- which I believe
    // to be worse. https://github.com/prettier/eslint-config-prettier#no-mixed-operators
    'no-mixed-operators': 'off',
    // Prettier wraps single line functions with ternaries, etc in parens by default, but
    // if the line is long enough it breaks it into a separate line and removes the parens.
    // The second behavior conflicts with prettier. There is some guides on the repo about
    // how you can keep it enabled:
    // https://github.com/prettier/eslint-config-prettier#no-confusing-arrow
    // However, in practice this conflicts with prettier adding parens around short lines,
    // when autofixing in vscode and others.
    'no-confusing-arrow': 'off',
    // There is no configuration in prettier for how it stylizes regexes, which conflicts
    // with wrap-regex.
    'wrap-regex': 'off',
    // Prettier handles all indentation automagically. it can be configured here
    // https://prettier.io/docs/en/options.html#tab-width but the default matches our
    // style.
    indent: 'off',
    'function-paren-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'generator-star-spacing': 'off',
    'default-param-last': 'off',
    'require-atomic-updates': 'off',
    'import/no-unassigned-import': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-object-spread': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/jsx-boolean-value': 'error',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    'react/jsx-equals-spacing': 'error',
    'react/no-deprecated': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/jsx-closing-tag-location': [
      'error',
      { selfClosing: 'tag-aligned', nonEmpty: 'tag-aligned' },
    ],
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-first-prop-new-line': ['error', 'multiline'],
    'react/jsx-max-props-per-line': [
      'error',
      { maximum: 1, when: 'multiline' },
    ],
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'always',
        afterOpening: 'never',
      },
    ],

    'no-invalid-this': 'off',
    'babel/no-invalid-this': 'error',

    'babel/semi': ['error', 'never'],
    'mocha/no-setup-in-describe': 'off',
  },

  overrides: [
    {
      files: ['test/e2e/**/*.js'],
      rules: {
        'mocha/no-hooks-for-single-case': 'off',
      },
    },
    {
      files: ['app/scripts/migrations/*.js', '*.stories.js'],
      rules: {
        'import/no-anonymous-default-export': ['error', { allowObject: true }],
      },
    },
    {
      files: ['app/scripts/migrations/*.js'],
      rules: {
        'global-require': 'off',
      },
    },
    {
      files: ['test/**/*-test.js', 'test/**/*.spec.js'],
      rules: {
        // Mocha will re-assign `this` in a test context

        'babel/no-invalid-this': 'off',
      },
    },
    {
      files: ['development/**/*.js', 'test/e2e/benchmark.js', 'test/helper.js'],
      rules: {
        'no-process-exit': 'off',
      },
    },
    {
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'nyc.config.js',
        'stylelint.config.js',
        'development/**/*.js',
        'test/e2e/**/*.js',
        'test/env.js',
        'test/setup.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },
}
