import { createI18nOptions, languageStorageKey, resolveLanguage } from "i18n";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const storedLanguage = window.localStorage.getItem(languageStorageKey);
const lng = resolveLanguage(storedLanguage ?? navigator.language);

void i18next.use(initReactI18next).init(createI18nOptions({ lng }));
