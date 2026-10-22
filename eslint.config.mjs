import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default [
  {
    ignores: [
      'node_modules/',
      'docs/',
      'coverage/',
      'src/js/third_party/',
      'index.node.js',
      'index.web.js',
      'index.web.min.js'
    ]
  },
  js.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser
      }
    },
    rules: {
      // Possible Errors
      'no-await-in-loop': 0,
      'no-cond-assign': 2,
      'no-constant-condition': 2,
      'no-control-regex': 2,
      'no-debugger': 2,
      'no-dupe-args': 2,
      'no-dupe-keys': 2,
      'no-duplicate-case': 2,
      'no-empty-character-class': 2,
      'no-empty': 2,
      'no-ex-assign': 2,
      'no-extra-boolean-cast': 2,
      '@stylistic/no-extra-parens': 1,
      '@stylistic/no-extra-semi': 2,
      'no-func-assign': 2,
      'no-inner-declarations': 2,
      'no-invalid-regexp': 2,
      'no-irregular-whitespace': [2, { skipComments: true }],
      'no-obj-calls': 2,
      'no-prototype-builtins': 2,
      'no-regex-spaces': 2,
      'no-sparse-arrays': 2,
      'no-template-curly-in-string': 2,
      'no-unexpected-multiline': 2,
      'no-unreachable': 2,
      'no-unsafe-finally': 2,
      'no-unsafe-negation': 2,
      'use-isnan': 2,
      'valid-typeof': 2,

      // Best Practices
      'accessor-pairs': 2,
      'array-callback-return': 1,
      'block-scoped-var': 2,
      'complexity': [1, { max: 10 }],
      'consistent-return': 2,
      'curly': 0,
      'default-case': 1,
      '@stylistic/dot-location': 0,
      'dot-notation': 1,
      'eqeqeq': 1,
      'guard-for-in': 1,
      'no-alert': 1,
      'no-caller': 1,
      'no-case-declarations': 2,
      'no-div-regex': 1,
      'no-else-return': 1,
      'no-empty-function': 1,
      'no-empty-pattern': 2,
      'no-eq-null': 0,
      'no-eval': 1,
      'no-extend-native': 1,
      'no-extra-bind': 1,
      'no-extra-label': 1,
      'no-fallthrough': 2,
      '@stylistic/no-floating-decimal': 1,
      'no-implicit-coercion': 1,
      'no-implied-eval': 1,
      'no-invalid-this': 1,
      'no-iterator': 1,
      'no-labels': 1,
      'no-lone-blocks': 1,
      'no-loop-func': 1,
      'no-magic-numbers': 0,
      '@stylistic/no-multi-spaces': 0,
      'no-multi-str': 1,
      'no-global-assign': 1,
      'no-new-func': 1,
      'no-new-wrappers': 1,
      'no-new': 1,
      'no-octal': 1,
      'no-octal-escape': 1,
      'no-param-reassign': 1,
      'no-proto': 1,
      'no-redeclare': 1,
      'no-return-assign': 1,
      'no-script-url': 1,
      'no-self-assign': 1,
      'no-self-compare': 1,
      'no-sequences': 1,
      'no-throw-literal': 1,
      'no-unmodified-loop-condition': 1,
      'no-unused-expressions': 1,
      'no-unused-labels': 1,
      'no-useless-call': 1,
      'no-useless-concat': 1,
      'no-useless-escape': 1,
      'no-void': 1,
      'no-warning-comments': 1,
      'no-with': 1,
      'radix': 1,
      'vars-on-top': 1,
      '@stylistic/wrap-iife': 1,
      'yoda': [1, 'never', { exceptRange: true }],

      // Strict Mode
      'strict': 0,

      // Variables
      'init-declarations': 1,
      'no-delete-var': 2,
      'no-label-var': 1,
      'no-restricted-globals': 1,
      'no-shadow': 2,
      'no-shadow-restricted-names': 1,
      'no-undef': 2,
      'no-undef-init': 2,
      'no-undefined': 1,
      'no-unused-vars': 1,
      // conflicts with init-declarations, which requires initializing every variable
      'no-useless-assignment': 0,
      'no-use-before-define': 2,

      // Stylistic Issues
      '@stylistic/comma-spacing': [2, { before: false, after: true }],
      '@stylistic/indent': [1, 2, { SwitchCase: 1 }],
      '@stylistic/linebreak-style': [2, 'unix'],
      '@stylistic/quotes': [1, 'single'],
      '@stylistic/semi': [2, 'never'],

      // ECMAScript6
      'arrow-body-style': 0,
      '@stylistic/arrow-parens': [1, 'always'],
      '@stylistic/arrow-spacing': [2, { before: true, after: true }],
      'constructor-super': 2,
      '@stylistic/generator-star-spacing': [2, 'before'],
      'no-class-assign': 2,
      'no-const-assign': 2,
      'no-dupe-class-members': 1,
      'no-duplicate-imports': 1,
      'no-new-native-nonconstructor': 1,
      'no-restricted-imports': 1,
      'no-this-before-super': 1,
      'no-useless-computed-key': 1,
      'no-useless-constructor': 1,
      'no-var': 1,
      'object-shorthand': 0,
      'prefer-arrow-callback': 1,
      'prefer-const': 1,
      'prefer-rest-params': 1,
      'prefer-spread': 1,
      'require-yield': 2,
      'sort-imports': 0,
      '@stylistic/template-curly-spacing': 1,
      '@stylistic/yield-star-spacing': 1,

      // for debug
      'no-console': 0
    }
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.mjs', 'vitest.config.mjs'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
]
