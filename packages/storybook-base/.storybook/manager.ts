import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges/manager-helpers";
// .storybook/manager.ts
import { addons } from "storybook/manager-api";

addons.setConfig({
  tagBadges: [...defaultConfig] satisfies TagBadgeParameters,
});
