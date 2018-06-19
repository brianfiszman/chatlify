module.exports = {
    "plugins": [
        "react",
        "flowtype"
    ],
    "extends": [
      "airbnb",
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:flowtype/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "es6":     true,
        "browser": true,
        "node":    true,
        "mocha":   true
    },
    "parser": "babel-eslint",
    "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "react/prefer-stateless-function": [0, { "ignorePureComponents": false }],
      "jsx-a11y/click-events-have-key-events": 0,
      "jsx-a11y/no-noninteractive-element-to-interactive-role": 0,
      "jsx-a11y/no-noninteractive-element-interactions": 0
    }
}
