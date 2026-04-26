import { authI18nBundle } from "./bundles/auth";
import { webI18nBundle } from "./bundles/web";

export const supportedLanguages = ["en", "fr"] as const;
export const defaultLanguage = "en";
export const defaultNamespace = "web";
export const languageStorageKey = "react-hono-mono-starter.language";
export const defaultBundles = [webI18nBundle, authI18nBundle] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];
export type TranslationValue =
  | string
  | {
    readonly [key: string]: TranslationValue;
  };
export type TranslationNamespace = Readonly<Record<string, TranslationValue>>;
export type I18nBundle = {
  readonly [language in SupportedLanguage]: Readonly<Record<string, TranslationNamespace>>;
};
export type I18nResources = import("./generated/i18next-resources").default;

export function isSupportedLanguage(language: string): language is SupportedLanguage {
  return supportedLanguages.includes(language as SupportedLanguage);
}

export function resolveLanguage(language?: string | null): SupportedLanguage {
  const normalizedLanguage = language?.split("-")[0] ?? defaultLanguage;

  return isSupportedLanguage(normalizedLanguage) ? normalizedLanguage : defaultLanguage;
}

export function mergeI18nBundles(...bundles: readonly I18nBundle[]): I18nBundle {
  const merged = {
    en: {},
    fr: {},
  } as Record<SupportedLanguage, Record<string, TranslationNamespace>>;

  for (const bundle of bundles) {
    for (const language of supportedLanguages) {
      Object.assign(merged[language], bundle[language]);
    }
  }

  return merged as I18nBundle;
}

export function getNamespacesFromBundles(bundles: readonly I18nBundle[]): string[] {
  const namespaces = new Set<string>();

  for (const bundle of bundles) {
    for (const language of supportedLanguages) {
      for (const namespace of Object.keys(bundle[language])) {
        namespaces.add(namespace);
      }
    }
  }

  return [...namespaces];
}

export const resources = mergeI18nBundles(...defaultBundles);
export const namespaces = getNamespacesFromBundles(defaultBundles);

export function createI18nOptions({
  bundles = defaultBundles,
  defaultNS = defaultNamespace,
  lng = defaultLanguage,
}: {
  bundles?: readonly I18nBundle[];
  defaultNS?: string;
  lng?: SupportedLanguage;
} = {}) {
  return {
    lng,
    fallbackLng: defaultLanguage,
    defaultNS,
    ns: getNamespacesFromBundles(bundles),
    returnNull: false,
    interpolation: {
      skipOnVariables: false,
    },
    resources: mergeI18nBundles(...bundles),
  } as const;
}

export { authI18nBundle, webI18nBundle };
