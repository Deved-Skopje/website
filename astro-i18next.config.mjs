/** @type {import("astro-i18next").AstroI18nextConfig} */
export default {
  defaultLocale: "en",
  locales: ["en", "mk"],
  routes: {
    mk: {
      about: "za",
      contact: "kontakt",
      projects: "proekti",
      blog: "blog",
      organization: "ogranizacija",
    },
  },
};
