import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://deved.mk",
  image: {
    remotePatterns: [{ protocol: 'https' }],
    domains: ["lh3.googleusercontent.com"]
  },
  integrations: [tailwind(), mdx(), sitemap(), compress({
    svg: false,
  }),]
});