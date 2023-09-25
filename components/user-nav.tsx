"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { PersonIcon } from "@radix-ui/react-icons";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/supabase-js";

import { useSupabase } from "@/components/providers/supabase-provider";

interface Props {
  user: User | null | undefined;
  userDetails?: any;
}

export function UserNav({ user, userDetails }: Props) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full flex items-center justify-center"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.user_metadata.avatar_url ?? "/avatar-icon.png"}
              alt={userDetails?.full_name ?? user.email}
            />
            <AvatarFallback>
              <PersonIcon />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal mt-1">
          <Link
            href={"/account"}
            className="flex flex-col space-y-1 hover:underline underline-offset-2"
          >
            <p className="text-sm font-medium">
              {userDetails?.full_name ?? user.email}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              {userDetails?.credits ?? 0} credits
            </p>
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-1">
          <DropdownMenuItem
            asChild
            className="text-muted-foreground cursor-pointer"
          >
            <Link href="/account">Manage account</Link>
          </DropdownMenuItem>
          <div className="space-y-5">
            <DropdownMenuItem
              onClick={toggleTheme}
              className="text-muted-foreground cursor-pointer"
            >
              Toggle theme
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem
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
              className="text-muted-foreground cursor-pointer"
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </div>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="mx-2">
          <Link href={"/pricing"}>
            <Button className="w-full flex items-center mb-2">
              Add credits
            </Button>
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
