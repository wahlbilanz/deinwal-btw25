module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "avoid",
  rangeStart: 0,
  rangeEnd: Infinity,
  requirePragma: false,
  insertPragma: false,
  proseWrap: "preserve",
  endOfLine: "auto",
  overrides: [
    {
      files: "*.component.html",
      options: {
        parser: "angular",
      },
    },
    {
      files: "*.html",
      options: {
        parser: "html",
      },
    },
  ],
};
