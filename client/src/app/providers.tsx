"use client";

import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { FilterProvider } from "@/context/filter-context";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      <FilterProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </FilterProvider>
    </ThemeProvider>
  );
}
