module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "amd" : true,
        "node" : true
    },
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 2017
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "warn",
            "single"
        ],
        "semi": 0,
        "eqeqeq" : [
          "error"
        ],
        "no-trailing-spaces": [
          "error"
        ],
        "object-curly-spacing": [
            "warn", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console" : 0,
        "no-case-declarations" : 0,
        "space-infix-ops": ["error", {"int32Hint": false}],
        "keyword-spacing": ["warn"]
    },
    "globals": {
        "jest":true,
        "test": true,
        "afterAll":true,
        "beforeAll":true,
        "beforeEach":true,
        "expect": true,
        "describe": true,
        "it":true
    }
};
