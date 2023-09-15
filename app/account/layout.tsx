import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import { Navbar } from "@/components/navbar";

import { getSession, getUserDetails } from "../supabase-server";
import { ThemeProvider } from "../providers/theme-provider";

export const metadata: Metadata = {
  title: "Glyph | Your Account",
  description: "Manage your account settings and preferences.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/account",
  },
  {
    title: "Billing",
    href: "/account/billing",
  },
  {
    title: "Appearance",
    href: "/account/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const [session, userDetails] = await Promise.all([
    getSession(),
    getUserDetails(),
  ]);

  const user = session?.user;

  if (!session) {
    return redirect("/signin");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Navbar user={user} userDetails={userDetails} />
      <div className="space-y-6 p-10 pb-16 md:block mt-12">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
