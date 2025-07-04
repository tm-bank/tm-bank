import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { UserX } from "lucide-react";
import { useAuth } from "@/providers/auth-provider";

import { Separator } from "../ui/separator";
import {
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Badge } from "../ui/badge";

export function AppSidebarFooter() {
  const { user, signInWithDiscord, signOut } = useAuth();

  return (
    <SidebarFooter className="bg-accent pb-4 pt-4">
      <SidebarMenu>
        {user ? (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={"Sign out"}
                size={"lg"}
                onClick={() => signOut()}
                className="cursor-pointer"
              >
                <UserX className="h-4 w-4" />
                Sign Out
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Separator className="mt-2 mb-2" />
              <SidebarMenuButton tooltip="Profile" size="lg">
                <Avatar className="h-8 w-8">
                  {user.avatar_url !== "none" ? (
                    <AvatarImage
                      src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar_url}`}
                      alt={user.display_name || "User"}
                    />
                  ) : (
                    <AvatarFallback>
                      {user.display_name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span>{user?.display_name || user?.id}</span>
                {user.role === "Admin" && <Badge variant={"destructive"}>Admin</Badge>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        ) : (
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign in with Discord"
              size="lg"
              onClick={() => signInWithDiscord()}
              className="bg-accent-foreground text-accent justify-center hover:bg-accent-foreground/90 hover:text-accent/90"
            >
              <span>Sign in</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarFooter>
  );
}