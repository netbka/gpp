//import { quasar } from "@quasar/vite-plugin";

import { Lang } from "quasar";

// https://nuxt.com/docs/api/configuration/nuxt-config
//import vsharp from "vite-plugin-vsharp";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: "strict",
    },
  },

  ssr: true,
  cors: true,

  // compilerOptions: {
  //   isCustomElement: (tag) => tag === "Textareatool",
  // },
  css: ["@quasar/extras/material-icons/material-icons.css", "~/assets/styles/style.css", "~/assets/styles/hero.css"],

  //devtools: { enabled: true },
  // vite: {
  //   plugins: [vsharp()],
  // },
  //"@nuxtjs/supabase",
  modules: ["nuxt-quasar-ui", "@pinia/nuxt", "@pinia-plugin-persistedstate/nuxt", "nuxt-gtag", "@nuxtjs/sitemap", "nuxt-vue3-google-signin", "@nuxtjs/i18n"],

  i18n: {
    lazy: true,
    langDir: "i18n",
    strategy: "prefix_and_default",
    locales: [
      {
        code: "en-US",
        file: "en-US.json",
        name: "English",
        shortname: "EN",
        iso: "en-US",
        default: true,
        dir: "ltr",
      },
      {
        code: "ru-RU",
        file: "ru-RU.json",
        name: "Русский",
        shortname: "РУ",
        iso: "ru-RU",
        dir: "ltr",
      },
      {
        code: "he-IL",
        file: "he-IL.json",
        name: "עברית",
        shortname: "עב",
        iso: "he-IL",
        dir: "rtl",
      },
    ],
    defaultLocale: "en-US",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "gpp_i18n",
      alwaysRedirect: true,
    },
  },

  googleSignIn: {
    clientId: "1012403012975-8klr44gtthf5ngdu61u4au91c28l00h7.apps.googleusercontent.com",
  },

  gtag: {
    id: "G-F8G8QM2PBG",
  },

  plugins: [
    //"~/plugins/prisma-client.ts",
    "~/plugins/fetch.ts",
    "~/plugins/apifetch.ts",
    "~/plugins/i18n.ts",

    // ... other plugins
  ],

  // image: {
  //   dir: "assets/images",
  // },
  quasar: {
    plugins: ["Notify", "Loading"],
    extras: {
      //font: "roboto-font",
      //fontIcons: ["fontawesome-v6"],
    },
    sassVariables: "~/assets/styles/quasar.sass",

    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },

  // vite: {
  //   resolve: {
  //     alias: {
  //       ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
  //     },
  //   },
  // },
  // nitro: {
  //   routeRules: {
  //     "/api/**": {
  //       proxy: "https://localhost:7094/**",
  //     },
  //   },
  // },
  runtimeConfig: {
    dbPassword: process.env.DB_PASSWORD,
    public: {
      baseUrl: process.env.NODE_ENV === "development" ? "https://localhost:7094/api" : "https://apiofp.mamrukov.com/api", //"https://apiofp.runasp.net/api",
      wwwwUrl: process.env.NODE_ENV === "development" ? "https://localhost:7094" : "https://apiofp.mamrukov.com",
    },
  },

  site: {
    url: "https://ofp.mamrukov.com",
  },

  sitemap: {
    //hostname: "https://ofp.mamrukov.com",
    exclude: ["/auth/**", "/profile/**", "/trainingtrack/**", "/privacy-policy/**"],
    //gzip: true,

    sources: ["/api/__sitemap__/urls"],
  },

  app: {
    // layoutTransition: { name: "layout", mode: "out-in" },
    //pageTransition: { name: "page", mode: "out-in" },

    head: {
      //title: "Тренировки ОФП | ОФП для бегунов ",
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",

      meta: [
        //{ name: "google-site-verification", content: "uXK0HHaPvvfo536fFBdCTgJRLl57jaLZmssNa9g6U" },
        { name: "url", content: "https://ofp.mamrukov.com" },
        { name: "locale", content: "ru_RU" },
        { name: "image", content: "https://ofp.mamrukov.com/main_page_hero.webp" },
        { name: "og:locale", content: "ru_RU" },
        { name: "og:type", content: "website" },
        { name: "og:image", content: "https://ofp.mamrukov.com/main_page_hero.webp" },
        { name: "og:url", content: "https://ofp.mamrukov.com" },
        { name: "og:site_name", content: "Просто ОФП" },
        { name: "twitter:image", content: "https://ofp.mamrukov.com/main_page_hero.webp" },
        { name: "twitter:site", content: "https://ofp.mamrukov.com" },
        { name: "twitter:url", content: "https://ofp.mamrukov.com" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // { rel: "preconnect", href: "https://fonts.googleapis.com" },
        // { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        { href: "https://fonts.googleapis.com/css2?family=Reddit+Sans+Condensed:wght@100;200;300;400;500;600;700;800;900&display=swap", rel: "stylesheet" },

        //{ rel: "preconnect", href: "https://fonts.googleapis.com" },
        //{ rel: "preconnect", href: "https://fonts.gstatic.com" },
        //{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap" },
      ],
    },
  },

  // build: {
  //   transpile: ["quasar"],
  // },
  // build: {
  //   transpile: ["@supabase/gotrue-js"],
  // },
  // vite: {
  //   define: {
  //     "process.env.DEBUG": false,
  //   },
  //   plugins: [quasar({ sassVariables: "assets/styles/quasar.variables.sass" })],
  // },

  publicRuntimeConfig: {
    // supabase: {
    //   url: process.env.SUPABASE_URL,
    //   key: process.env.SUPABASE_KEY,
    // },
  },

  // supabase: {
  //   // cookieOptions: {
  //   //   name: 'test',
  //   //   maxAge: 60 * 60,
  //   //   sameSite: 'strict',
  //   //   secure: false,
  //   // },
  //   // clientOptions: {
  //   //   auth: {
  //   //     flowType: 'implicit',
  //   //   },
  //   // },
  //   redirect: true,
  //   redirectOptions: {
  //     login: "/auth",
  //     callback: "/training",
  //     exclude: ["/", "/public/*", "/training/*", "/training", "/auth/*", "/exerciseTemplate/*", "/exercisetemplate/*", "/exercisetemplate", "/exerciseTemplate", "/privacy-policy/*"],
  //   },
  // },
  devServer: {
    https: {
      key: "localhost-key-home.pem",
      cert: "localhost-home.pem",
    },
  },

  compatibilityDate: "2024-08-26",
});
