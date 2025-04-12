
import React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent border-purpleMedium/30 hover:bg-purpleMedium/10">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-purpleMedium" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-purpleLight" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-purpleMedium/20 dark:bg-purpleDark">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 hover:bg-purpleLight/10 dark:hover:bg-purpleMedium/20 cursor-pointer"
        >
          <Sun className="h-4 w-4 text-purpleMedium" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 hover:bg-purpleLight/10 dark:hover:bg-purpleMedium/20 cursor-pointer"
        >
          <Moon className="h-4 w-4 text-purpleMedium" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 hover:bg-purpleLight/10 dark:hover:bg-purpleMedium/20 cursor-pointer"
        >
          <Monitor className="h-4 w-4 text-purpleMedium" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
