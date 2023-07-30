module.exports = {
  root: true,
  extends: ["plugin:tailwindcss/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
};
