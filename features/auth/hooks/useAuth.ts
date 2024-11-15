import { useSession } from "@hono/auth-js/react";

export const useAuth = () => {
    const session = useSession();
    const user = session.data?.user;

    return user?.id
        ? { user, isLoggedIn: true } as const
        : { user: undefined, isLoggedIn: false } as const;
};