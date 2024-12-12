import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import LogoImage from "@/assets/logopet.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { logout } from "@/utils/authService";
import { useToast } from "@/hooks/use-toast";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "/#features",
    label: "Features",
  },
  {
    href: "/#testimonials",
    label: "Testimonials",
  },
  {
    href: "/#pricing",
    label: "Pricing",
  },
  {
    href: "/#faq",
    label: "FAQ",
  },
  // {
  //   href: "/articles",
  //   label: "Articles",
  // },
  {
    href: "/services",
    label: "Services",
  },
  {
    href: "/history",
    label: "History",
  },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, refreshAuth } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleLogout = () => {
    logout();
    refreshAuth();
    toast({ title: "Successfully logout", variant: "default" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-[1px] bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4">
          <NavigationMenuItem className="flex font-bold">
            <img src={LogoImage} alt="Logo" className="mr-2 h-14 w-auto" />
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-auto mt-3 flex text-xl font-bold"
            >
              Dunia PetCare
            </a>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex h-5 w-5 md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">
                    Shadcn/React
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <a
                      rel="noreferrer noopener"
                      key={label}
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      {label}
                    </a>
                  ))}
                  <a
                    rel="noreferrer noopener"
                    href="https://github.com/leoMirandaa/shadcn-landing-page.git"
                    target="_blank"
                    className={`w-[110px] border ${buttonVariants({
                      variant: "secondary",
                    })}`}
                  >
                    <GitHubLogoIcon className="mr-2 h-5 w-5" />
                    Github
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden gap-2 md:flex">
            {routeList.map((route: RouteProps, i) => (
              <a
                rel="noreferrer noopener"
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </a>
            ))}
          </nav>

          <div className="hidden gap-2 md:flex">
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant={"secondary"}
                className="border"
              >
                Logout
              </Button>
            ) : (
              <Button
                rel="noreferrer noopener"
                onClick={() => navigate("/login")}
                className={`border ${buttonVariants({ variant: "secondary" })}`}
              >
                Login
              </Button>
            )}
            <Button
              className={user?.role === "admin" ? "block" : "hidden"}
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>
            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
