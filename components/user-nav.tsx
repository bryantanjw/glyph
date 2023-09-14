"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

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

import { useSupabase } from "../app/supabase-provider";
import { PersonIcon } from "@radix-ui/react-icons";

interface Props {
  user: User | null | undefined;
  userDetails?: any;
}

export function UserNav({ user, userDetails }: Props) {
  console.log("userDetails: ", userDetails);
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
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuLabel className="font-normal mt-1">
          <div className="flex flex-col space-y-2">
            <p className="text-sm font-medium">
              {userDetails?.full_name ?? user.email}
            </p>
            <p className="text-sm leading-none text-muted-foreground">
              3 credits
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem
            asChild
            className="text-muted-foreground cursor-pointer"
          >
            <Link href="/account">Manage account</Link>
          </DropdownMenuItem>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <div className="mx-2">
          <Button className="w-full flex items-center mb-2">Add credits</Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
