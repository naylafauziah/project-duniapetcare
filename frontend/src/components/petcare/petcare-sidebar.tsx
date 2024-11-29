import { Inbox } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { logout } from "@/utils/authService";
import { useAuth } from "@/hooks/use-auth";

const items = [
  {
    title: "ini menu 1",
    url: "#",
    icon: Inbox,
  },
  {
    title: "ini menu 2",
    url: "#",
    icon: Inbox,
  },
  {
    title: "ini menu 3",
    url: "#",
    icon: Inbox,
  },
];

function PetcareSidebar() {
  const { refreshAuth } = useAuth();
  return (
    <Sidebar>
      <SidebarHeader className="items-center">Petcare Nayla</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>{" "}
      </SidebarContent>
      <SidebarFooter>
        <p>ini button logout sementara</p>
        <Button
          onClick={() => {
            refreshAuth();
            logout();
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default PetcareSidebar;
