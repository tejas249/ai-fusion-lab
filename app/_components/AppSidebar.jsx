"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export function AppSidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-3">
          <div className="flex items-center justify-between">
            {/* Logo + Title */}
            <div className="flex items-center space-x-2">
              <Image
                src={"/logo.svg"}
                alt="Logo"
                width={60}
                height={60}
                className="w-[40px] h-[40px] rounded-lg object-cover"
              />
              <h2 className="font-bold text-xl">AI FUSION</h2>
            </div>

            {/* Theme Toggle Button */}
            {!mounted ? (
              <Button variant="ghost">
                <Sun className="opacity-0" /> {/* Placeholder to avoid flicker */}
              </Button>
            ) : theme === "light" ? (
              <Button variant="ghost" onClick={() => setTheme("dark")}>
                <Sun />
              </Button>
            ) : (
              <Button variant="ghost" onClick={() => setTheme("light")}>
                <Moon />
              </Button>
            )}
          </div>

          {/* New Chat Button */}
          <div>
            <Button className="mt-2 w-full" size="lg">
              + New Chat
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="p-3">
            <h2 className="font-bold text-lg">Chat</h2>
            <p className="text-sm text-gray-400">
              Sign in to start chatting with multiple AI Models
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-3 mb-10">
          <Button className="w-full">Sign In / Sign Up</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
