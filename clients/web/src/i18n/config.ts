import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";

export const defaultNs = "translation";
export const resources = {
  en,
  fr,
} as const;

function isSupportedLanguage(language: string): language is keyof typeof resources {
  return Object.hasOwn(resources, language);
}

const browserLanguage = navigator.language.split("-")[0] ?? "en";
const lng = isSupportedLanguage(browserLanguage) ? browserLanguage : "en";

void i18next.use(initReactI18next).init({
  lng,
  fallbackLng: "en",
  defaultNS: defaultNs,
  ns: [defaultNs],
  returnNull: false,
  interpolation: {
    skipOnVariables: false,
  },
  resources,
});
