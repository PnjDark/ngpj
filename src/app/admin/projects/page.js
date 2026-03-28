"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects, deleteProject } from "@/services/projects";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const fetchedProjects = await getProjects(false);
    setProjects(fetchedProjects);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Projects</h1>
          <p className="text-neutral-500">Manage your portfolio projects and case studies.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
        >
          <Plus size={18} /> Add Project
        </Link>
      </header>

      <div className="border border-neutral-800 rounded-2xl bg-neutral-900 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-neutral-800/50 border-b border-neutral-800 text-sm font-semibold text-neutral-400">
              <th className="p-4">Title</th>
              <th className="p-4">Category</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-neutral-800/20 transition duration-300">
                <td className="p-4">
                  <span className="font-bold block text-white">{project.title}</span>
                  <span className="text-[10px] text-neutral-500 font-mono tracking-tighter uppercase">{project.id}</span>
                </td>
                <td className="p-4">
                  <span className="px-3 py-1 bg-neutral-800 border border-neutral-700 rounded-full text-xs text-neutral-300">
                    {project.category}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === 'Published' ? 'bg-green-500/10 text-green-500' :
                    project.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-neutral-500/10 text-neutral-500'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/projects/${project.id}`}
                      target="_blank"
                      className="p-2 text-neutral-400 hover:text-white transition duration-300"
                    >
                      <ExternalLink size={18} />
                    </Link>
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="p-2 text-neutral-400 hover:text-white transition duration-300"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition duration-300"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-neutral-500 italic">No projects found. Create your first one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
