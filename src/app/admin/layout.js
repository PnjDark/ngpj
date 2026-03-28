"use client";

import { useAuth } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Zap,
  MessageSquare,
  Settings as SettingsIcon,
  LogOut
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 flex flex-col fixed h-full bg-neutral-950 z-20">
        <div className="p-8 border-b border-neutral-800">
          <h2 className="text-xl font-bold tracking-tighter">PENJY ADMIN</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <SidebarLink href="/admin" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarLink href="/admin/projects" icon={<Briefcase size={18} />} label="Projects" />
          <SidebarLink href="/admin/case-studies" icon={<BookOpen size={18} />} label="Case Studies" />
          <SidebarLink href="/admin/skills" icon={<Zap size={18} />} label="Skills" />
          <SidebarLink href="/admin/messages" icon={<MessageSquare size={18} />} label="Messages" />
          <SidebarLink href="/admin/settings" icon={<SettingsIcon size={18} />} label="Settings" />
        </nav>
        <div className="p-4 border-t border-neutral-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition"
          >
            <LogOut size={18} />
            <span className="text-sm font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 min-h-screen">
        {children}
      </main>
    </div>
  );
}

function SidebarLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-2 text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg transition"
    >
      {icon}
      <span className="text-sm font-semibold">{label}</span>
    </Link>
  );
}
