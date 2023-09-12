import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://deved.mk",
  image: {
    remotePatterns: [{ protocol: 'https' }],
    domains: ["lh3.googleusercontent.com"]
  },
  integrations: [tailwind(), mdx(), sitemap(), icon({
    include: {
      mdi: ["cog", "linkedin", "twitter", "facebook", "instagram"],
      uil: ["map-marker", "envelope"],
      ic: ["baseline-rocket-launch"],
      bx: ["bxs-briefcase", "bxs-data", "bxs-window-alt", "bxs-bot", "bxs-file-find"],
    }
  }), compress({
    svg: false,
  }),],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});