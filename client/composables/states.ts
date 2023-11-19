import type { User } from "~/types/user";

export const useMe = () =>
    useState<User | null>("me", () => {
        return null;
    });
