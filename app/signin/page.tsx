import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { UserAuthForm } from "./components/user-auth-form";

import { getSession } from "@/app/supabase-server";

export const metadata: Metadata = {
  title: "Glyph | Sign in",
  description: "Log into Glyph.",
};

export default async function AuthenticationPage() {
  const session = await getSession();

  if (session) {
    return redirect("/");
  }

  return (
    <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/pricing"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8 z-50"
        )}
      >
        Pricing
      </Link>
      <div className="relative hidden min-h-screen flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <Link
          href={"/"}
          className="relative z-20 flex items-center text-lg font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Glyph
        </Link>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 flex justify-center items-center h-screen">
        <div className="lg:p-8 flex justify-center items-center h-screen relative">
          <UserAuthForm />

          <p className="px-2 md:px-8 text-center text-xs text-muted-foreground absolute bottom-10 w-full">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-primary"
            >
              Privacy Policy
            </Link>
            , and to receive periodic emails with updates.
          </p>
        </div>
      </div>
    </div>
  );
}
