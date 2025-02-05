const { settings, parserOptions } = require("eslint-plugin-import/config/react");
const { default: sourceType } = require("eslint-plugin-import/lib/core/sourceType");
const { plugin } = require("typescript-eslint");

module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },
    },
    plugins: ["import"],
    extends: ["eslint:recommended", "plugin:import/errors", "plugin:import/warnings"],
    overrides: [
        {
            env: {
                node : true,
            },
            files: [
                ".eslintrc.{js,cjs}",
            ],
            parserOptions: {
                sourceType: "script",
            },
        }
    ],
    parserOptions:{
        ecmaVersion: "latest",
        sourceType: "module"
    },
    rules: {
        "no-unused-vars": "warn",
        "no-empty": "warn",
    }
}