"use client";

import {
  X,
  Home,
  Info,
  Users,
  Bell,
  Calendar,
  Trophy,
  Image,
  BookOpen,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserProfileMenu } from "../userPorfileAndDropdown/userProfile";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isAdmin: boolean;
  user: any;
  onLogin: () => void;
}

export default function MobileMenu({
  open,
  onClose,
  isAdmin,
  user,
  onLogin,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h3 className="text-xl font-bold tracking-tight">
          TechTalk Club<span className="text-primary">.</span>
        </h3>

        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Menu */}
      <nav className="flex-1 flex flex-col gap-2 px-5 py-4 text-lg">
        <MobileLink to="/" label="Home" icon={Home} onClose={onClose} />
        <MobileLink to="/about" label="About Us" icon={Info} onClose={onClose} />
        <MobileLink to="/members" label="Team / Members" icon={Users} onClose={onClose} />
        <MobileLink to="/notice" label="Notices" icon={Bell} onClose={onClose} />

        <Separator className="my-2" />

        <MobileLink
          to="/events/upcoming"
          label="Upcoming Events"
          icon={Calendar}
          onClose={onClose}
        />
        <MobileLink
          to="/events/past"
          label="Past Events"
          icon={Calendar}
          onClose={onClose}
        />
        <MobileLink
          to="/leaderboard"
          label="Leaderboard"
          icon={Trophy}
          onClose={onClose}
        />
        <MobileLink to="/gallery" label="Gallery" icon={Image} onClose={onClose} />
        <MobileLink to="/blog" label="Blogs" icon={BookOpen} onClose={onClose} />

        {isAdmin && (
          <>
            <Separator className="my-2" />
            <MobileLink
              to="/admin"
              label="Admin Panel"
              icon={Shield}
              onClose={onClose}
            />
          </>
        )}
      </nav>

      {/* Auth */}
    

      {/* Footer */}
      <div className="pb-4 text-center text-sm text-muted-foreground">
        <p className="font-semibold text-foreground">Tech Talk Club (TTC)</p>
        <p>Dept. of CSE / IT / AI & ML</p>
      </div>
    </div>
  );
}

function MobileLink({
  to,
  label,
  icon: Icon,
  onClose,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  onClose: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClose}
      className="flex items-center gap-3 rounded-md px-3 py-2.5 hover:bg-accent transition-colors"
    >
      <Icon className="h-5 w-5 text-muted-foreground" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
