// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/apollo"],
    build: {
        transpile: ["tslib"],
    },
    runtimeConfig: {
        public: {
            apiUrl: process.env.API_URL,
            googleLoginUrl: process.env.GOOGLE_LOGIN_URL,
            loginUrl: process.env.LOGIN_URL,
            logoutUrl: process.env.LOGOUT_URL,
        },
    },
    app: {
        pageTransition: { name: "page", mode: "out-in" },
    },
    ui: {
        icons: ["mdi", "fe", "game-icons", "fa6-brands"],
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
                tokenName: "access_token",
                httpLinkOptions: {
                    credentials: "include",
                },
            },
        },
    },
});
