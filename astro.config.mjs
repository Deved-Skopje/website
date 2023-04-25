import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  site: "https://deved.mk",
  integrations: [
    astroI18next(),
    tailwind(),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
    mdx(),
    sitemap(),
    compress({
      svg: false,
    }),
  ],
});
