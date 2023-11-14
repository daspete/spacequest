import type { Config } from "tailwindcss";
// import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                logo: ["'Josefin Sans'", "sans-serif"]
            }
        },
    },
    plugins: [
        // iconsPlugin({
        //     collections: getIconCollections(["mdi", "svg-spinners"]),
        // }),
    ],
};
