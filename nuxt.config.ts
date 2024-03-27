//import { quasar } from "@quasar/vite-plugin";

// https://nuxt.com/docs/api/configuration/nuxt-config
//import vsharp from "vite-plugin-vsharp";

export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  // compilerOptions: {
  //   isCustomElement: (tag) => tag === "Textareatool",
  // },
  css: ["@quasar/extras/material-icons/material-icons.css", "~/assets/styles/style.css"],
  //devtools: { enabled: true },
  // vite: {
  //   plugins: [vsharp()],
  // },
  modules: ["@nuxtjs/supabase", "nuxt-quasar-ui", "@pinia/nuxt"],
  // lodash: {
  //   prefix: "_",
  //   prefixSkip: ["string"],
  //   upperAfterPrefix: false,
  //   exclude: ["map"],
  //   alias: [
  //     ["camelCase", "stringToCamelCase"], // => stringToCamelCase
  //     ["kebabCase", "stringToKebab"], // => stringToKebab
  //     ["isDate", "isLodashDate"], // => _isLodashDate
  //   ],
  // },
  plugins: [
    //"~/plugins/prisma-client.ts",
    "~/plugins/fetch.ts",

    // ... other plugins
  ],
  // image: {
  //   dir: "assets/images",
  // },
  quasar: {
    plugins: ["Notify", "Loading"],
    extras: {
      font: "roboto-font",
      fontIcons: ["fontawesome-v6"],
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
  ssr: true,
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser": "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       sass: {
  //         additionalData: '@use "~/assets/styles/quasar.sass" as *\n',
  //       },
  //     },
  //   },
  // },
  runtimeConfig: {
    dbPassword: process.env.DB_PASSWORD,
  },
  app: {
    // layoutTransition: { name: "layout", mode: "out-in" },
    // pageTransition: { name: "page", mode: "out-in" },

    head: {
      title: "Я.ОФП - просто тренировки",
      charset: "utf-16",
      viewport: "width=device-width, initial-scale=1",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // { rel: "preconnect", href: "https://fonts.googleapis.com" },
        // { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
        // { href: "https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap", rel: "stylesheet" },

        //{ rel: "preconnect", href: "https://fonts.googleapis.com" },
        //{ rel: "preconnect", href: "https://fonts.gstatic.com" },
        //{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono&display=swap" },
      ],
    },
  },
  // build: {
  //   transpile: ["quasar"],
  // },
  // vite: {
  //   define: {
  //     "process.env.DEBUG": false,
  //   },
  //   plugins: [quasar({ sassVariables: "assets/styles/quasar.variables.sass" })],
  // },
  // ssr: true,
  supabase: {
    // cookieOptions: {
    //   name: 'test',
    //   maxAge: 60 * 60,
    //   sameSite: 'strict',
    //   secure: false,
    // },
    // clientOptions: {
    //   auth: {
    //     flowType: 'implicit',
    //   },
    // },
    redirect: true,
    redirectOptions: {
      login: "/auth",
      callback: "/workout",
      exclude: ["/", "/public/*", "/workout/*", "/workout", "/auth/*"],
    },
  },
});
