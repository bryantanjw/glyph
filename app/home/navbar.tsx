"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { NotionLogoIcon } from "@radix-ui/react-icons";
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

interface NavbarProps {
  page?: string;
}

export function Navbar({ page }: NavbarProps) {
  const [isWhiteSectionInView, setIsWhiteSectionInView] = React.useState(false);

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

  return (
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
                  <NavigationMenuLink
                    href="/gallery"
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent focus:bg-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 ",
                      page === "pricing" &&
                        !isWhiteSectionInView &&
                        "hover:bg-slate-800 focus:bg-slate-800"
                    )}
                  >
                    Gallery
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <UserNav />
        </div>
      </div>
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
