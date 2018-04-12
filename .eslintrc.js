module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "env": {
    "browser": true,
    "es6": true
  },
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  }
};
