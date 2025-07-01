import { ReactNode } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { BrowserRouter } from "react-router-dom";

export function Layout({ children }: { children: ReactNode | ReactNode[] }) {
    return (
        <ThemeProvider defaultTheme="dark">
            <SidebarProvider open>
                <BrowserRouter>{children}</BrowserRouter>
            </SidebarProvider>
        </ThemeProvider>
    )
}