import {
  CircleUser,
  Newspaper,
  LayoutDashboard,
  Users,
  CalendarRange,
  HandHeart,
} from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Layanan",
    route: "/layanan",
    icon: HandHeart,
  },
  {
    title: "Artikel",
    route: "/article",
    icon: Newspaper,
  },
  {
    title: "Booking",
    route: "/booking",
    icon: CalendarRange,
  },
  {
    title: "List User",
    route: "/list-user",
    icon: Users,
  },
  {
    title: "Profile",
    route: "/profile",
    icon: CircleUser,
  },
];

function PetcareSidebar() {
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();
  return (
    <Sidebar>
      <SidebarHeader className="items-center">Petcare Nayla</SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild className="cursor-pointer">
                <a onClick={() => navigate(item.route)}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <p>ini button logout sementara</p>
        <Button
          onClick={() => {
            logout();
            refreshAuth();
          }}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export default PetcareSidebar;
