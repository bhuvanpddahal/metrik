"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "@hono/auth-js/react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/Form";
import { useToast } from "@/hooks/useToast";
import { env } from "@/constants/env/client";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { type SigninPayload, signinSchema } from "@/features/auth/schemas";

const AuthForm = () => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SigninPayload>({
        resolver: zodResolver(signinSchema),
        defaultValues: { email: "" }
    });

    const onSubmit = (payload: SigninPayload) => {
        startTransition(async () => {
            const response = await signIn("nodemailer", {
                email: payload.email,
                callbackUrl: `${env.NEXT_PUBLIC_APP_URL}/dashboard`
            });

            if (response?.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.error
                });
            }

            window.metrik?.("signup", { email: payload.email });
        });
    };

    return (
        <Form {...form}>
            <form
                className="w-full space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="email"
                                    placeholder="Enter your email"
                                    className="shadow-none"
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full"
                    isLoading={isPending}
                >
                    {isPending ? "Signing in" : "Sign in"}
                </Button>
            </form>
        </Form>
    );
};

export default AuthForm;