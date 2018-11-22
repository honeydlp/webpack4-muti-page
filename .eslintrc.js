module.exports ={
  env: {
      browser: true,
      es6: true,
      jquery: true
  },
  "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
  },
  "globals":{
      $: true,
      util: true,
      iScroll: true,
      Swiper: true
  },
  "rules": {
      "linebreak-style":[
          "warn",
          "windows"
      ],
      "semi": [
          "error",
          "never"
      ],
      "padded-blocks":[0, "never"],
      "max-len": "off",
      "comma-dangle": "off",
      "require-jsdoc": [2, {
          require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
          },
      }],
      "space-before-function-paren": [2, {
          asyncArrow: "always",
          anonymous: "always",
          named: "never",
      }],
      "one-var": "off",
      "no-use-before-define": "warn",
      "no-return-assign": "warn",
      "no-unused-vars": "warn",
      "no-empty-pattern": "warn"
  }
}
