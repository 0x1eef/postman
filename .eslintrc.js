module.exports = {
  extends: ["standard"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module"
  },
  globals: {
    "FontFace": "readonly"
  },
  rules: {
    "space-before-function-paren": ["error", "never"]
  }
};
