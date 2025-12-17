import { Shield, Users, FileText, Settings, LogOut } from "lucide-react";
import { useAppSelector } from "@/store/hook";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-[var(--color-card)] border-b border-[var(--color-border)] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-[var(--color-primary)]" />
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>

          
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-2">
            Welcome back, <span className="text-[var(--color-primary)]">{user?.name}</span>
          </h2>
          <p className="text-[var(--color-muted-foreground)]">
            Manage users, content, and system settings from one place.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Role" value="Admin" />
          <StatCard title="Status" value={user?.status} />
          <StatCard title="Last Login" value={new Date(user?.lastLogin).toLocaleDateString()} />
          <StatCard title="Verified" value={user?.isVerified ? "Yes" : "No"} />
        </section>

        {/* Actions */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ActionCard
            icon={<Users />}
            title="User Management"
            description="View and manage students, admins, and members"
            to="/admin/users"
          />
          <ActionCard
            icon={<FileText />}
            title="Content & Blogs"
            description="Approve, edit, or remove content"
            to="/admin/blogs"
          />
          <ActionCard
            icon={<Settings />}
            title="System Settings"
            description="Configure roles, permissions, and preferences"
            to="/admin/settings"
          />
        </section>

        {/* Footer actions */}
        <div className="mt-16 flex justify-end">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-destructive)] text-[var(--color-destructive-foreground)] shadow hover:opacity-90 transition">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value?: string }) {
  return (
    <div
      className="rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] p-6 shadow"
      style={{
        boxShadow: `var(--shadow-offset-x) var(--shadow-offset-y) var(--shadow-blur) oklch(0 0 0 / var(--shadow-opacity))`,
      }}
    >
      <p className="text-sm text-[var(--color-muted-foreground)] mb-1">{title}</p>
      <p className="text-xl font-semibold">{value || "—"}</p>
    </div>
  );
}

function ActionCard({
  icon,
  title,
  description,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="group rounded-xl bg-[var(--color-card)] border border-[var(--color-border)] p-6 shadow hover:translate-y-[-2px] hover:shadow-lg transition"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-foreground)] mb-4 group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-primary-foreground)] transition">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[var(--color-muted-foreground)]">{description}</p>
    </Link>
  );
}
