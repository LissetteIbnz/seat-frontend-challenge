const fs = require("fs");
const path = require("path");

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".prettierrc"), "utf8"));

module.exports = {
  extends: ["react-app", "react-app/jest", "eslint:recommended", "prettier"],
  plugins: ["react-hooks", "prettier"],
  rules: {
    "prettier/prettier": ["error", prettierOptions],
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      rules: { "prettier/prettier": ["warn", prettierOptions] },
    },
  ],
};
