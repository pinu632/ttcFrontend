"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeProvider/toggleMode";
import LoginDialog from "@/Pages/LogInModal/login";
import { useAppSelector } from "@/store/hook";
import { UserProfileMenu } from "../userPorfileAndDropdown/userProfile";
import { Menu } from "lucide-react";
import MobileMenu from "./mobileNavbar";

export function TechTalkNavbar() {
  const [loginOpen, setLoginOpen] = useState(false);
  const user = useAppSelector(s => s.auth.user)
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAdmin: boolean = user?.role?.some((r: string) => r === 'Admin') ?? false;

  console.log(user)
  return (
    <div className="w-full min-h-[64px] sticky top-0 z-40 bg-background border-border border-b-[1px]  ">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center justify-center gap-2 text-foreground hover:opacity-90 transition-opacity"
        >
          {/* <img
            src="/assets/logo/TechTalk_Club__1_-removebg-preview.png"
            alt="Tech Talk Club Logo"
            className="h-[50px] w-auto rounded-md "
          /> */}

          <h3 className="text-2xl font-codec font-bold tracking-tight">
            TechTalk Club<span className="text-violet-600 text-4xl">.</span>
          </h3>

          {/* <div className="leading-tight">
           
            <h2 className="text-xs text-muted-foreground">
              Dept. of CSE · IT · AIML
            </h2>
          </div> */}
        </Link>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList className="hidden sm:flex gap-4 text-foreground justify-center items-center">
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/" className=" text-lg hover:text-primary ">
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg hover:text-primary ">
                About
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <DropdownCard>
                  <NavItem to="/about" title="About Us" />
                  <NavItem to="/members" title="Team / Members" />
                </DropdownCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/notice" className=" text-lg hover:text-primary ">
                  Notices
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg hover:text-primary ">
                Events
              </NavigationMenuTrigger>
              <NavigationMenuContent className="text-lg ">
                <DropdownCard>
                  <NavItem to="/events/upcoming" title="Upcoming Events" />
                  <NavItem to="/events/past" title="Past Events" />
                  <NavItem to="/leaderboard" title="Leaderboard" />
                  <NavItem to="/gallery" title="Gallery" />
                </DropdownCard>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link
                  to="/leaderboard"
                  className=" text-lg hover:text-primary "
                >
                  Leaderboard
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/gallery" className=" text-lg hover:text-primary ">
                  Gallery
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/blog" className=" text-lg hover:text-primary ">
                  Blogs
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {isAdmin && <NavigationMenuItem>
              <NavigationMenuLink>
                <Link to="/admin" className=" text-lg hover:text-primary ">
                  Admin
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Theme + Login */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          {user ? <UserProfileMenu /> : <Button onClick={() => setLoginOpen(true)} size="lg" variant={"outline"}>
            Log In
          </Button>}
          <div className="sm:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      <LoginDialog open={loginOpen} setOpen={setLoginOpen} />
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAdmin={isAdmin}
        user={user}
        onLogin={() => setLoginOpen(true)}
      />

    </div>
  );
}

function DropdownCard({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-3 p-4 w-[250px] bg-card ">{children}</div>;
}

function NavItem({ to, title }: { to: string; title: string }) {
  return (
    <NavigationMenuLink>
      <Link to={to} className=" hover:text-primary block text-lg  font-light">
        {title}
      </Link>
    </NavigationMenuLink>
  );
}
