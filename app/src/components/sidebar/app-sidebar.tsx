import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "../ui/sidebar";
import { TMBank } from "../tm-bank";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function AppSidebar() {
    let location = useLocation();

    return (
        <Sidebar collapsible="icon" className="border-r-0">
            <SidebarHeader>
                <SidebarMenu className="flex flex-row items-center">
                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-md">
                        <TMBank.Logo css="size-6" />
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                            <Link to={"/"}>
                                <Home />
                                <span>Home</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}