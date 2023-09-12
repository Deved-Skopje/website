import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import icon from "astro-icon";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import fs from "node:fs";
import parseFrontmatter from "gray-matter";

const render = (title) => ({
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#efefef",
      padding: "55px 70px",
      color: "#111111",
      fontFamily: "JetBrains Mono",
      fontSize: 64,
    },
    children: [
      {
        type: "svg",
        props: {
          style: "width: 60px;",
          xmlns: "http://www.w3.org/2000/svg",
          width: "60",
          viewBox: "447 86 187 209",
          fill: "none",
          children: [
            {
              type: "path",
              props: {
                d: `M542.000,87.000L571.000,117.000L504.000,183.000L504.000,187.000L542.000,225.000L483.000,225.000L448.000,189.000L448.000,180.000L542.000,87.000Z`,
                fill: "#7a5997",
                fillOpacity: "1",
              },
            },
            {
              type: "path",
              props: {
                d: `M539.000,294.000L510.000,264.000L577.000,198.000L577.000,194.000L539.000,156.000L598.000,156.000L633.000,192.000L633.000,201.000L539.000,294.000Z`,
                fill: "#63ae7b",
                fillOpacity: "0.75",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: { marginTop: 64 },
          children: title,
        },
      },
      {
        type: "div",
        props: {
          style: { marginTop: 48, fontSize: 24, color: "#333333" },
          children: "DeveD | https://deved.mk",
        },
      },
      {
        type: "div",
        props: {
          style: { marginTop: 16, fontSize: 18, color: "#333333" },
          children: "relations | education | events",
        },
      },
      {
        type: "img",
        props: {
          src: "https://deved.mk/eddy.svg",
          height: "240px",
          style: {
            position: "absolute",
            right: 60,
            bottom: 60,
          },
        },
      },
    ],
  },
});

const og = () => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      try {
        const jetBrainsMono = fs.readFileSync(
          "public/JetBrainsMono-Regular.ttf"
        );

        for (const { pathname } of pages) {
          console.log("pathname", pathname);
          if (pathname && pathname.startsWith("blog/") && pathname !== 'blog/') {
            console.log(
              "reading",
              `src/content/${pathname.slice(0, pathname.length - 1)}.md`
            );
            const file = fs.readFileSync(
              `src/content/${pathname.slice(0, pathname.length - 1)}.md`
            );

            const { title } = parseFrontmatter(file).data;

            const svg = await satori(render(title), {
              width: 1200,
              height: 630,
              fonts: [
                {
                  name: "JetBrains Mono",
                  data: jetBrainsMono,
                  weight: 400,
                  style: "normal",
                },
              ],
            });

            const resvg = new Resvg(svg, {
              fitTo: {
                mode: "width",
                value: 1200,
              },
            });
            console.log('writing to ', `${dir.pathname}${pathname}og.png`)
            fs.writeFileSync(
              `${dir.pathname}${pathname}og.png`,
              resvg.render().asPng()
            );
          }
        }

        console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`);
      } catch (e) {
        console.error(e);
        console.log(`\x1b[31mog:\x1b[0m OpenGraph image generation failed\n`);
      }
    },
  },
});


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
  }), og()],
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
});