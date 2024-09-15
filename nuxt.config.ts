// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: "/nuxt-storage/",
    buildAssetsDir: "assets",
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
});
