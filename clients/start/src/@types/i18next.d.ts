import "i18next";
import type { I18nResources } from "i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "start";
    enableSelector: true;
    resources: I18nResources;
    returnNull: false;
    strictKeyChecks: true;
  }
}
