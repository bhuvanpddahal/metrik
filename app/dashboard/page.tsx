"use client";

import { signOut, useSession } from "@hono/auth-js/react";

import { Button } from "@/components/ui/Button";

const DashboardPage = () => {
    const session = useSession();
    const user = session.data?.user;

    return (
        <div>
            {user ? (
                <div>
                    <Button onClick={() => signOut()}>
                        Log Out
                    </Button>
                    <p>{user.email}</p>
                </div>
            ) : (
                <div>
                    You are logged out
                </div>
            )}
        </div>
    );
};

export default DashboardPage;