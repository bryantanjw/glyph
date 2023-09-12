import { redirect } from "next/navigation";

import Playground from "@/components/playgroud";
import { Navbar } from "@/components/navbar";

import { getSession, getSubscription } from "./supabase-server";

export default async function PlaygroundPage() {
  const [session, subscription] = await Promise.all([
    getSession(),
    getSubscription(),
  ]);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <>
      <Navbar user={session?.user} />
      <Playground />
    </>
  );
}
