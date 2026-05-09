import antfu from "@antfu/eslint-config"

import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
    antfu({
        type: "app",
        vue: true,
        typescript: true,
        formatters: true,
        stylistic: {
            indent: 4,
            semi: false,
            quotes: "double",
        },
        ignores: [
            ".pnpm-store/**",
            "**/migrations/**",
        ],
    }, {
        rules: {
            "ts/no-redeclare": "off",
            "ts/consistent-type-definitions": ["error", "type"],

            "no-console": "warn",

            "antfu/no-top-level-await": "off",

            "node/prefer-global/process": "off",
            "node/no-process-env": "error",

            "unicorn/filename-case": ["error", {
                case: "kebabCase",
                ignore: ["README.md"],
            }],
        },
    }, {
        files: ["**/*.vue"],
        rules: {
            "vue/max-attributes-per-line": ["error", {
                singleline: { max: 2 },
                multiline: { max: 1 },
            }],
        },
    }, {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
        rules: {
            "perfectionist/sort-imports": ["error", {
                tsconfig: {
                    rootDir: ".",
                },
            }],
        },
    }, {
        files: ["**/*.yml", "**/*.yaml"],
        rules: {
            "yml/indent": ["error", 2],
        },
    }),
)
