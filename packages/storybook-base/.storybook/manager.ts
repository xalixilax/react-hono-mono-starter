// .storybook/manager.ts
import { addons } from "storybook/manager-api";
import { defaultConfig, type TagBadgeParameters } from "storybook-addon-tag-badges/manager-helpers";

addons.setConfig({
  tagBadges: [...defaultConfig] satisfies TagBadgeParameters,
});
