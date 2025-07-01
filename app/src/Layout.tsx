import { ThemeProvider } from "./components/theme-provider";
import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./routes/HomePage";


export function Layout() {
    return (
        <ThemeProvider defaultTheme="dark">
            <SidebarProvider open>
                <BrowserRouter>
                    <AppSidebar />
                    <SidebarInset className="p-4">
                        <Routes>
                            <Route path="/" index element={<HomePage />} />
                        </Routes>
                    </SidebarInset>
                </BrowserRouter>
            </SidebarProvider>
        </ThemeProvider>
    )
}
