import { createI18nOptions, languageStorageKey, resolveLanguage } from "i18n";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

/**
 * TanStack Start renders on the server first, so `window` and `navigator` are not
 * available during SSR. Fall back to the package default language there.
 */
function resolveInitialLanguage() {
  if (typeof window === "undefined") {
    return undefined;
  }

  return resolveLanguage(window.localStorage.getItem(languageStorageKey) ?? navigator.language);
}

void i18next.use(initReactI18next).init(createI18nOptions({ lng: resolveInitialLanguage() }));
