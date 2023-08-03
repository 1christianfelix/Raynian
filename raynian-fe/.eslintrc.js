module.exports = {
  root: true,
  extends: ["plugin:tailwindcss/recommended"],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.js", "*.jsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/migration-from-tailwind-2": "off",
    "react-hooks/exhaustive-deps": "off",
  },
};
