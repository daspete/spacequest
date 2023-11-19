// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/apollo"],
    ui: {
        icons: ["mdi", "fe", "game-icons", "fa6-brands"],
    },
    build: {
        transpile: ["tslib"],
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            googleLoginUrl: process.env.GOOGLE_LOGIN_URL,
            logoutUrl: process.env.LOGOUT_URL,
        },
    },
    image: {
        provider: "twicpics",
        twicpics: {
            baseURL: "https://worldtowerdefense.twic.pics/",
        },
    },
    apollo: {
        clients: {
            default: {
                httpEndpoint: "https://graph.spacequest.link/graphql",
                httpLinkOptions: {
                    credentials: "include",
                },
            },
        },
    },
});
