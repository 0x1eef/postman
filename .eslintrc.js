module.exports = {
  extends: ["standard-with-typescript", "prettier"],
  plugins: ["prettier"],
  parserOptions: { project: "./tsconfig.json", },
  rules: {
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": true,
        "singleQuote": false,
        "printWidth": 85,
        "arrowParens": "avoid"
      }
    ]
  },
};
