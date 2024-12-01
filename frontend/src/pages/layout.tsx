import { ModeToggle } from "@/components/landing-page/mode-toggle";
import PetcareSidebar from "@/components/petcare/petcare-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <PetcareSidebar />
      <main className="h-full w-full">
        <SidebarTrigger />
        <ModeToggle />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
