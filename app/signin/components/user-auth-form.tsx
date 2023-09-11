"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useSupabase } from "@/app/supabase-provider";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const FadeInDown = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.4, delay: 0.2 }}
  >
    {children}
  </motion.div>
);

const FadeInUp = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -30 }}
    transition={{ duration: 0.4, delay: 0.9 }}
  >
    {children}
  </motion.div>
);

const FadeInRight = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 30 }}
    transition={{ duration: 0.4, delay: 0.4 }}
  >
    {children}
  </motion.div>
);

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh();
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh();
  };

  return (
    <AnimatePresence mode="wait">
      <div
        className={cn(
          "mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] -mt-14",
          className
        )}
        {...props}
      >
        <div className="flex flex-col space-y-2 text-center mb-2">
          {isSignUp ? (
            <FadeInDown key="signUp">
              <h1 className="text-3xl font-semibold tracking-tight">
                Get started
              </h1>
              <p className="text-sm text-muted-foreground">Create an account</p>
            </FadeInDown>
          ) : (
            <FadeInDown key="signIn">
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-muted-foreground">
                Sign in to your account
              </p>
            </FadeInDown>
          )}
        </div>

        <div className="grid gap-6">
          <Button variant="outline" type="button" disabled={isLoading}>
            {isLoading ? (
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
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div className="grid gap-5">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                disabled={isLoading}
                type="submit"
                className="h-10 shadow-xl"
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSignUp ? (
                  <FadeInRight key="signUp">Sign up</FadeInRight>
                ) : (
                  <FadeInRight key="signIn">Sign in</FadeInRight>
                )}
              </Button>
            </div>
          </form>

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
                Don't have an account?{" "}
                <span
                  onClick={setIsSignUp.bind(null, true)}
                  className="underline underline-offset-2 hover:text-muted-foreground text-black cursor-pointer"
                >
                  Sign up now
                </span>
              </p>
            </FadeInUp>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
}
