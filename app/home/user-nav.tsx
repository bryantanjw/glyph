import { useEffect } from "react";
import { useTheme } from "next-themes";

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

export function UserNav() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleKeydown(event) {
      // Check if the 'Meta' (Command on Mac) key is pressed along with 'K'
      if (event.metaKey && event.key === "k") {
        toggleTheme();
      }
    }

    // Add the event listener
    window.addEventListener("keydown", handleKeydown);

    // Remove the event listener on component unmount
    return () => window.removeEventListener("keydown", handleKeydown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    // Add logic for 'system' theme if needed
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 space-y-3" align="end" forceMount>
        <DropdownMenuLabel className="font-normal mt-1">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">bryantanjw01@gmail.com</p>
            <p className="text-xs leading-none text-muted-foreground">
              3 credits
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="space-y-2">
          <DropdownMenuItem
            onClick={toggleTheme}
            className="text-muted-foreground"
          >
            Theme
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-muted-foreground">
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
