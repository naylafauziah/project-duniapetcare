import PetcareSidebar from "@/components/petcare/petcare-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      <PetcareSidebar />
      <main className="w-full h-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
