interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <main className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 dark:bg-[radial-gradient(hsl(0,72%,35%,40%),hsl(24,62%,27%,40%),hsl(var(--background))_60%)]">
            {children}
        </main>
    );
};

export default AuthLayout;