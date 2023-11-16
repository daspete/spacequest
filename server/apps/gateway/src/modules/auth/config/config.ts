export default () => ({
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackUrl: process.env.GOOGLE_CALLBACK_URL,
    },
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    client: {
        url: process.env.CLIENT_URL,
    },
});
