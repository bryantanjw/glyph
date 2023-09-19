"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowRightIcon,
  CameraIcon,
  Cross2Icon,
  EnterIcon,
  ExitIcon,
  HamburgerMenuIcon,
  MoonIcon,
  NotionLogoIcon,
  PersonIcon,
  RocketIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { User } from "@supabase/supabase-js";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { UserNav } from "./user-nav";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSupabase } from "@/components/providers/supabase-provider";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

interface NavbarProps {
  page?: string;
  user: User | null | undefined;
  userDetails?: any;
}

export default function Navbar({ page, user, userDetails }: NavbarProps) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  const [isWhiteSectionInView, setIsWhiteSectionInView] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const whiteSection = document.getElementById("whiteSection");
      if (whiteSection) {
        const rect = whiteSection.getBoundingClientRect();
        setIsWhiteSectionInView(rect.top <= 50 && rect.bottom >= 50);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    function handleKeydown(event) {
      // Check if the 'Meta' (Command on Mac) key is pressed along with 'K'
      if (event.metaKey && event.key === "k") {
        toggleTheme();
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 lg:px-8 sm:flex-row h-14 backdrop-blur-md border-b border-b-opacity-50 bg-transparent dark:text-white",
          page === "pricing" ? "text-white border-slate-800" : "text-black",
          isWhiteSectionInView && "text-black border-slate-200"
        )}
      >
        {" "}
        <Link href={"/"} className="text-lg font-semibold">
          Glyph
        </Link>
        <div className="ml-auto flex space-x-3 sm:justify items-center">
          <Button
            variant="ghost"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn(
              "md:hidden",
              page === "pricing" ? "dark" : "",
              isWhiteSectionInView && "light"
            )}
          >
            {isMenuOpen ? <Cross2Icon /> : <HamburgerMenuIcon />}
          </Button>

          <div className="hidden space-x-5 md:flex items-center">
            <div className="space-x-2">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={cn(
                        "bg-transparent data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
                        page === "pricing" &&
                          !isWhiteSectionInView &&
                          "hover:bg-slate-800 data-[state=open]:bg-slate-800"
                      )}
                    >
                      Getting started
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                              href="/"
                            >
                              <NotionLogoIcon className="h-6 w-6" />
                              <div className="mb-2 mt-4 text-lg font-medium">
                                Refer a friend
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Earn 10 credits for each referral.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Getting good">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem href="/pricing" title="Pricing">
                          How to install dependencies and structure your app.
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link
                      href="/gallery"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800",
                        page === "pricing" &&
                          !isWhiteSectionInView &&
                          "hover:bg-slate-800 focus:bg-slate-800"
                      )}
                    >
                      Gallery
                    </Link>
                  </NavigationMenuItem>

                  {user ? (
                    <div className="pl-5">
                      <UserNav user={user} userDetails={userDetails} />
                    </div>
                  ) : (
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href="/signin"
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "group",
                          "bg-transparent focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800",
                          page === "pricing" &&
                            !isWhiteSectionInView &&
                            "hover:bg-slate-800 focus:bg-slate-800"
                        )}
                      >
                        <span>Log In</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="ml-4 h-3 w-3 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cn(
              "fixed top-14 flex w-full flex-col justify-between bg-white dark:bg-slate-900 border-b rounded-b-md z-40 bg-opacity-80 backdrop-blur",
              page === "pricing"
                ? "dark bg-slate-900 text-white border-slate-700"
                : "",
              isWhiteSectionInView && "bg-white text-black border-slate-200"
            )}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col px-6 py-6">
              <div className="flex flex-col gap-5">
                <Link href="/pricing" className="flex items-center gap-3">
                  <RocketIcon /> Pricing
                </Link>
                <Link href="/gallery" className="flex items-center gap-3">
                  <CameraIcon /> Gallery
                </Link>
                <span className="flex items-center gap-3" onClick={toggleTheme}>
                  {theme === "light" ? <MoonIcon /> : <SunIcon />} Toggle theme
                </span>
                <p
                  onClick={async () => {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                      console.error("Error signing out:", error.message);
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message || "Failed to sign out.",
                      });
                      return;
                    }
                    router.push("/signin");
                  }}
                  className="cursor-pointer flex items-center gap-3 mt-4"
                >
                  <ExitIcon /> Logout
                </p>
              </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-slate-400 border-opacity-20 px-2">
              {user ? (
                <Link
                  href="/account"
                  className="flex items-center gap-2 p-4 hover:bg-gray-50 justify-between"
                >
                  <div className="flex flex-row items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user.user_metadata.avatar_url ?? "/avatar-icon.png"
                        }
                        alt={userDetails?.full_name ?? user.email}
                      />
                      <AvatarFallback>
                        <PersonIcon />
                      </AvatarFallback>
                    </Avatar>

                    <div className="ml-3">
                      <p className="text-sm font-medium">
                        {userDetails?.full_name ?? user.email}
                      </p>
                      <p className="text-sm leading-none text-muted-foreground">
                        3 credits
                      </p>
                    </div>
                  </div>

                  <ArrowRightIcon className="h-5 w-5 mr-2" />
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/signin">Log In</Link>
                  <EnterIcon />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
