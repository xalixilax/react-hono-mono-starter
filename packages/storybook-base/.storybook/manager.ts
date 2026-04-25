// .storybook/manager.ts
import { addons } from "storybook/manager-api";
import { defaultConfig } from "storybook-addon-tag-badges";

addons.setConfig({
  tagBadges: [...defaultConfig],
});
