
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  Menu, 
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Products", href: "/products", icon: Package },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-background dark:bg-zinc-900">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-sidebar border-r border-border transition-all duration-300 fixed inset-y-0 left-0 z-20",
          collapsed ? "w-16" : "w-64",
          isMobile && collapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className={cn(
            "flex items-center h-16 px-4 border-b border-border",
            collapsed ? "justify-center" : "justify-between"
          )}>
            {!collapsed && <span className="font-semibold text-xl text-sidebar-foreground dark:text-white">Dashboard</span>}
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className={collapsed ? "ml-0" : "ml-auto"}>
              {collapsed ? <Menu size={20} /> : <X size={20} />}
            </Button>
          </div>

          <nav className="flex-1 p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center py-2 px-3 rounded-md text-sidebar-foreground",
                      collapsed ? "justify-center" : "justify-start",
                      location.pathname === item.href 
                        ? "bg-primary/10 text-primary font-medium dark:bg-primary/20 dark:text-white" 
                        : "hover:bg-sidebar-accent/50 dark:hover:bg-zinc-800/70"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mt-auto p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground dark:bg-primary/30 dark:text-white">
                  A
                </div>
                {!collapsed && (
                  <div className="ml-3">
                    <p className="text-sm font-medium text-sidebar-foreground dark:text-white">Admin User</p>
                    <p className="text-xs text-sidebar-foreground/70 dark:text-zinc-400">admin@example.com</p>
                  </div>
                )}
              </div>
              {!collapsed && <ThemeToggle />}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        collapsed ? "ml-16" : "ml-64",
        isMobile && "ml-0"
      )}>
        {/* Mobile header */}
        {isMobile && (
          <div className="h-16 border-b border-border flex items-center px-4 justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                <Menu size={20} />
              </Button>
              <span className="font-semibold text-xl ml-3">Dashboard</span>
            </div>
            <ThemeToggle />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
