"use client";

import { useEffect, useState } from "react";
import { getProjects } from "@/services/projects";
import { getMessages } from "@/services/messages";
import {
  Users,
  Briefcase,
  MessageSquare,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projectsCount: 0,
    messagesCount: 0,
    activeCategories: 3,
    visitorsToday: 12
  });

  useEffect(() => {
    const fetchStats = async () => {
      const projects = await getProjects(false);
      const messages = await getMessages();
      setStats(prev => ({
        ...prev,
        projectsCount: projects.length,
        messagesCount: messages.length
      }));
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold mb-2">Welcome back, Patrick</h1>
        <p className="text-neutral-500">Manage your portfolio and track your engagement.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Briefcase className="text-blue-500" />}
          label="Total Projects"
          value={stats.projectsCount}
        />
        <StatCard
          icon={<MessageSquare className="text-green-500" />}
          label="Messages"
          value={stats.messagesCount}
        />
        <StatCard
          icon={<Users className="text-purple-500" />}
          label="Visitors Today"
          value={stats.visitorsToday}
        />
        <StatCard
          icon={<TrendingUp className="text-orange-500" />}
          label="Active Categories"
          value={stats.activeCategories}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-xl">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <p className="text-sm text-neutral-500 italic">No recent activity found.</p>
          </div>
        </div>

        <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-xl">
          <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton label="Add Project" href="/admin/projects/new" />
            <QuickActionButton label="Manage Skills" href="/admin/skills" />
            <QuickActionButton label="Settings" href="/admin/settings" />
            <QuickActionButton label="View Portfolio" href="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-neutral-800 rounded-lg">{icon}</div>
        <span className="text-sm text-neutral-400 font-semibold uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function QuickActionButton({ label, href }) {
  return (
    <a
      href={href}
      className="p-4 border border-neutral-800 rounded-xl text-center text-sm font-semibold hover:bg-neutral-800 transition duration-300"
    >
      {label}
    </a>
  );
}
