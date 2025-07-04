import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarRail } from "../ui/sidebar";
import { TMBank } from "../tm-bank";
import { Compass, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "../ui/separator";
import { AppSidebarFooter } from "./app-sidebar-footer";

export function AppSidebar() {
    const location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r-0">
            <SidebarHeader>
                <SidebarMenu className="flex flex-row items-center">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                        <TMBank.Logo css="size-6" />
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <Separator orientation="horizontal" />
            <SidebarContent className="p-2 flex flex-col gap-2">
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                    <Link to={"/"}>
                        <Home />
                        <span>Home</span>
                    </Link>
                </SidebarMenuButton>

                <SidebarMenuButton asChild isActive={location.pathname === "/discover"}>
                    <Link to={"/discover"}>
                        <Compass />
                        <span>Discover</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarContent>
            <SidebarRail />
            <AppSidebarFooter />
        </Sidebar>
    )
}