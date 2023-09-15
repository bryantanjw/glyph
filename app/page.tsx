import { redirect } from "next/navigation";

import Playground from "@/components/playgroud";
import { Navbar } from "@/components/navbar";

import { getSession, getSubscription, getUserDetails } from "./supabase-server";
import { ThemeProvider } from "./providers/theme-provider";

export default async function PlaygroundPage() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription(),
  ]);

  const user = session?.user;

  if (!session) {
    return redirect("/signin");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar user={user} userDetails={userDetails} />
      <Playground />
    </ThemeProvider>
  );
}
