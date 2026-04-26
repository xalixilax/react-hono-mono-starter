import "i18next";

import type { defaultNs, resources } from "../i18n/config";

declare module "i18next" {
    interface CustomTypeOptions {
        defaultNS: typeof defaultNs;
        enableSelector: true;
        resources: (typeof resources)["en"];
        returnNull: false;
        strictKeyChecks: true;
    }
}
