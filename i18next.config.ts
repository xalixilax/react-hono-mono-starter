// fallow-ignore-file unused-file
import { defineConfig } from "i18next-cli";

export default defineConfig({
    locales: ["en", "fr"],
    extract: {
        input: [
            "clients/**/*.{ts,tsx}",
            "packages/**/src/**/*.{ts,tsx}",
            "servers/**/*.{ts,tsx}",
        ],
        ignore: [
            "packages/i18n/**",
            "**/*.d.ts",
            "**/*.test.*",
            "**/*.spec.*",
        ],
        output: "packages/i18n/src/locales/{{language}}/{{namespace}}.ts",
        outputFormat: "ts",
        defaultNS: "web",
        primaryLanguage: "en",
        sort: true,
        indentation: 2,
        warnOnConflicts: true,
    },
    lint: {
        ignore: ["packages/i18n/**"],
    },
    types: {
        input: "packages/i18n/src/locales/en/**/*.ts",
        basePath: "packages/i18n/src/locales/en",
        output: "clients/web/src/@types/i18next.d.ts",
        resourcesFile: "packages/i18n/src/generated/i18next-resources.d.ts",
        enableSelector: true,
    },
});