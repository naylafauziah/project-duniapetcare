import {
  CircleUser,
  Newspaper,
  LayoutDashboard,
  Users,
  CalendarRange,
  HandHeart,
  Stethoscope,
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
import LogoImage from "@/assets/logopet.png";

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
  // {
  //   title: "Artikel",
  //   route: "/article",
  //   icon: Newspaper,
  // },
  {
    title: "Booking",
    route: "/booking",
    icon: CalendarRange,
  },
  {
    title: "Dokter",
    route: "/dokter",
    icon: Stethoscope,
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
      <SidebarHeader
        className="items-center hover:cursor-pointer font-bold mt-3 mb-2"
        onClick={() => navigate("/")}
      >
        <img src={LogoImage} alt="Logo" className="mr-2 h-14 w-auto bg-white rounded-full" />
        Dunia Petcare
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title} className="px-4 my-1">
              <SidebarMenuButton asChild className="cursor-pointer hover:bg-secondary data-[active=true]:bg-secondary" isActive={location.pathname === item.route}>
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
