import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "no-unused-private-class-members": "off",
    },
  },
];
