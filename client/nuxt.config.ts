// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    ssr: false,
    modules: ["@nuxt/ui", "@nuxt/image", "@nuxtjs/apollo"],
    ui: {
        icons: ['mdi', 'fe', 'game-icons']
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
