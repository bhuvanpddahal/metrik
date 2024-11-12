import { JWT } from "@auth/core/jwt";
import { Session, User } from "@auth/core/types";
import { AdapterUser } from "@auth/core/adapters";

declare module "@auth/core/types" {
    interface Session {
        user: {
            id: string;
            name: string | null;
            email: string;
            image: string | null;
        };
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        userId: string;
    }
}