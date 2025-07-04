import { ThemeProvider } from "./components/theme-provider";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/HomePage";
import { useAuth } from "./providers/auth-provider";
import AuthCallback from "./routes/auth";
import { useEffect } from "react";
import { initializeDeepLinks } from "./deeplinks";


export function Layout() {
    const { refetchUser } = useAuth();

    useEffect(() => {
        if (refetchUser) {
            initializeDeepLinks(refetchUser);
        }
    }, [refetchUser]);

    return (
        <ThemeProvider defaultTheme="dark">
            <SidebarProvider open>
                <AppSidebar />
                <SidebarInset className="p-4">
                    <Routes>
                        <Route path="/" index element={<HomePage />} />
                        <Route path="/auth/callback" element={<AuthCallback />} />
                    </Routes>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}
