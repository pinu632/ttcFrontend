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
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        bg-background
        flex flex-col
        h-[100dvh]
        w-full
        overscroll-none
      "
    >
      {/* ================= Header ================= */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 border-b border-border bg-background">
        <h3 className="text-lg font-bold tracking-tight">
          TechTalk Club<span className="text-primary">.</span>
        </h3>

        <Button size="icon" variant="ghost" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* ================= Menu ================= */}
      <nav
        className="
          flex-1
          overflow-y-auto
          px-4 py-4
          space-y-1
          text-base
        "
      >
        <MobileLink to="/" label="Home" icon={Home} onClose={onClose} />
        <MobileLink to="/about" label="About Us" icon={Info} onClose={onClose} />
        <MobileLink to="/members" label="Team / Members" icon={Users} onClose={onClose} />
        <MobileLink to="/notice" label="Notices" icon={Bell} onClose={onClose} />

        <Separator className="my-3" />

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
            <Separator className="my-3" />
            <MobileLink
              to="/admin"
              label="Admin Panel"
              icon={Shield}
              onClose={onClose}
            />
          </>
        )}
      </nav>

      {/* ================= Footer ================= */}
      <div className="sticky bottom-0 border-t border-border bg-background px-4 py-3 text-center text-xs text-muted-foreground">
        <p className="font-semibold text-foreground">Tech Talk Club (TTC)</p>
        <p>Dept. of CSE / IT / AI & ML</p>
      </div>
    </div>
  );
}

/* ================= Link Item ================= */
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
      className="
        flex items-center gap-3
        rounded-lg
        px-4 py-3
        min-h-[48px]
        hover:bg-accent
        transition-colors
        active:scale-[0.98]
      "
    >
      <Icon className="h-5 w-5 text-muted-foreground shrink-0" />
      <span className="font-medium">{label}</span>
    </Link>
  );
}
