import type { User } from "~/types/user";

export const useMe = () =>
    useState<User | null>("me", () => {
        return null;
    });

export const useIsLoginModalOpen = () =>
    useState<boolean>("isLoginModalOpen", () => false);

export const useEnterWar = () => {
    const me = useMe();
    const isLoginModalOpen = useIsLoginModalOpen();

    const enterWar = () => {
        if (!me.value) {
            isLoginModalOpen.value = true;
        } else {
            navigateTo("/game");
        }
    };

    return {
        enterWar,
    };
};
