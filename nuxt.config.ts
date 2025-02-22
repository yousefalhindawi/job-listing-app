// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", '@vueuse/nuxt'],
  runtimeConfig: {
    public: {
      apiBase: process.env.THEMUSE_API_URL,
      themuseApiKey: process.env.THEMUSE_API_KEY,
    },
  },
  app: {
    pageTransition: { name: "fade", mode: "out-in" },
    head: {
      title: "Jobs Finder",
      meta: [{ name: "description", content: "Jobs Finder" }],
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css",
        },
      ],
    },
  },
});
