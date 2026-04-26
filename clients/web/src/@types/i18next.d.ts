import "i18next";

import type { defaultNamespace, I18nResources } from "i18n";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNamespace;
        enableSelector: true;
        resources: I18nResources;
        returnNull: false;
        strictKeyChecks: true;
    }
}
