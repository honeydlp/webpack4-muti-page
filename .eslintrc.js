module.exports ={
    "parser": "typescript-eslint-parser",
    "env": {
      browser: true,
      es6: true,
      jquery: true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    "plugins": [
      "typescript"
    ],
    "extends": "standard",
    "globals":{
      $: true,
      lottie: true,
      IS_MOCK: true,
      INDEX_LIST: true
    },
    "rules": {
      "semi": [
        "error",
        "never"
      ],
      "padded-blocks":[0, "never"],
      "max-len": "off",
      "comma-dangle": "off",
      "space-before-function-paren": [2, {
        asyncArrow: "always",
        anonymous: "always",
        named: "never",
      }],
      "one-var": "off",
      "no-use-before-define": "warn",
      "no-return-assign": "warn",
      "no-unused-vars": "warn",
      "no-empty-pattern": "warn",
      "no-new": 0
    }
  }
  