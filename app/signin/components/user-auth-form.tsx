"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import { useSupabase } from "@/app/supabase-provider";
import { signInFormSchema } from "@/schemas/formSchemas";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface AnimatedDivProps {
  children: React.ReactNode;
  className?: string;
}

const FadeInDown = ({ children, className }: AnimatedDivProps) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.3, delay: 0.3 }}
    className={className}
  >
    {children}
  </motion.div>
);

const FadeInRight = ({ children, className }: AnimatedDivProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 30 }}
    transition={{ duration: 0.3, delay: 0.55 }}
    className={className}
  >
    {children}
  </motion.div>
);

const FadeInUp = ({ children, className }: AnimatedDivProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.3, delay: 0.75 }}
    className={className}
  >
    {children}
  </motion.div>
);

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { supabase } = useSupabase();
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleAuthLoading, setIsGoogleAuthLoading] =
    React.useState<boolean>(false);

  // Form definition
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);
    const { email, password } = values;
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setIsLoading(false);
      console.error(error);
      throw new Error(error.message);
    }
    console.log("handleSignUp -> data", data);
    setIsLoading(false);
  };

  const handleSignIn = async (values: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);
    const { email, password } = values;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in.",
        description: `${error.message}.` || "Uh oh! Something went wrong.",
      });
    } else {
      toast({
        title: "Succesfully signed in!",
      });
    }
    console.log("handleSignIn -> data", data);
    setIsLoading(false);
  };

  const handleSignInWithGoogle = async () => {
    setIsGoogleAuthLoading(true);

    // Add a delay to indicate loading
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setIsGoogleAuthLoading(false);
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in.",
        description: `${error.message}.` || "Uh oh! Something went wrong.",
      });
    }
    console.log("handleSignInWithGoogle -> data", data);
    setIsGoogleAuthLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 30 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "mx-auto flex flex-col w-[310px] justify-center space-y-6 md:w-[350px] -mt-14",
          className
        )}
      >
        <div className="text-center mb-2">
          {isSignUp ? (
            <FadeInDown key="signUp">
              <h1 className="text-3xl font-semibold tracking-tight mb-2">
                Redesign your <span className="text-indigo-500">QR code</span>{" "}
              </h1>
              <p className="text-sm text-muted-foreground">
                Create an account below. You will get 3 credits for free.
              </p>
            </FadeInDown>
          ) : (
            <FadeInDown key="signIn">
              <h1 className="text-3xl font-semibold tracking-tight mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </FadeInDown>
          )}
        </div>

        <Button
          variant="outline"
          disabled={isLoading || isGoogleAuthLoading}
          onClick={handleSignInWithGoogle}
        >
          {isGoogleAuthLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Continue with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(isSignUp ? handleSignUp : handleSignIn)}
          >
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid gap-3">
                        <Label
                          className="font-normal text-muted-foreground"
                          htmlFor="email"
                        >
                          Email
                        </Label>
                        <Input
                          className="shadow-sm"
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="grid gap-3">
                        <Label
                          className="font-normal text-muted-foreground"
                          htmlFor="password"
                        >
                          Password
                        </Label>
                        <Input
                          className="shadow-sm"
                          id="password"
                          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isSignUp ? (
                <FadeInRight key="signUp">
                  <Button
                    disabled={isLoading || isGoogleAuthLoading}
                    type="submit"
                    className="h-10 shadow-xl w-full"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign up
                  </Button>
                </FadeInRight>
              ) : (
                <FadeInRight key="signIn">
                  <Button
                    disabled={isLoading || isGoogleAuthLoading}
                    type="submit"
                    className="h-10 shadow-xl w-full"
                  >
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Sign in
                  </Button>
                </FadeInRight>
              )}
            </div>
          </form>
        </Form>

        {isSignUp ? (
          <FadeInUp key="signUp">
            <p className="px-8 text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <span
                onClick={setIsSignUp.bind(null, false)}
                className="underline underline-offset-2 hover:text-muted-foreground text-black cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </FadeInUp>
        ) : (
          <FadeInUp key="signIn">
            <p className="px-8 text-center text-sm text-muted-foreground w-full">
              Don&apos;t have an account?{" "}
              <span
                onClick={setIsSignUp.bind(null, true)}
                className="underline underline-offset-2 hover:text-muted-foreground text-black cursor-pointer"
              >
                Sign up now
              </span>
            </p>
          </FadeInUp>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
