"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProject, updateProject } from "@/services/projects";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function EditProject() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Developer",
    status: "Draft",
    techStack: "",
    tags: "",
    mediaAssets: ""
  });

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProject(id);
      if (project) {
        setFormData({
          title: project.title || "",
          description: project.description || "",
          category: project.category || "Developer",
          status: project.status || "Draft",
          techStack: project.techStack?.join(", ") || "",
          tags: project.tags?.join(", ") || "",
          mediaAssets: project.mediaAssets?.join(", ") || ""
        });
      }
      setLoading(false);
    };
    if (id) fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(",").map(s => s.trim()).filter(Boolean),
        tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
        mediaAssets: formData.mediaAssets.split(",").map(s => s.trim()).filter(Boolean)
      };
      await updateProject(id, projectData);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading project data...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 hover:bg-neutral-800 rounded-lg transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Edit Project</h1>
          <p className="text-neutral-500">Modify the existing project details.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Project Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Artist">Artist</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Tech Stack (comma separated)</label>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Tags / Skills (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-2 text-neutral-400">Media Asset URLs (comma separated)</label>
            <input
              type="text"
              name="mediaAssets"
              value={formData.mediaAssets}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition disabled:opacity-50"
          >
            <Save size={18} /> {saving ? "Saving Changes..." : "Update Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
