import type { StorybookConfig } from "@storybook/vue3-vite";
import vue from "@vitejs/plugin-vue";

const config: StorybookConfig = {
  stories: ["../src/components/**/*.stories.ts"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  async viteFinal(viteConfig) {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(vue());
    // GitHub Pages serves a project site under /<repo>/, so assets need that
    // prefix. Set via env so local `npm run storybook` stays at the root.
    viteConfig.base = process.env.STORYBOOK_BASE ?? "/";
    return viteConfig;
  },
};

export default config;
