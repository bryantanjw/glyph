import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { BrandStatement } from "@/components/brand-statement";
import { UserAuthForm } from "./components/user-auth-form";
import { cn } from "@/lib/utils";

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
      <BrandStatement />
      <div className="lg:p-8 flex justify-center items-center h-screen">
        <div className="lg:p-8 flex justify-center items-center h-screen relative">
          <UserAuthForm />

          <p className="px-2 md:px-8 text-center text-xs text-muted-foreground absolute bottom-10">
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
