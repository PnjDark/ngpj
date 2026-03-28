"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/services/projects";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Developer",
    status: "Draft",
    techStack: "",
    tags: "",
    mediaAssets: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(",").map(s => s.trim()).filter(Boolean),
        tags: formData.tags.split(",").map(s => s.trim()).filter(Boolean),
        mediaAssets: formData.mediaAssets.split(",").map(s => s.trim()).filter(Boolean)
      };
      await createProject(projectData);
      router.push("/admin/projects");
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/projects" className="p-2 hover:bg-neutral-800 rounded-lg transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">New Project</h1>
          <p className="text-neutral-500">Create a new project entry for your portfolio.</p>
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
              placeholder="e.g., E-commerce Platform"
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
              placeholder="Detailed project description..."
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
              placeholder="Next.js, Tailwind CSS, Firebase"
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
              placeholder="Frontend Development, UI Design"
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
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition disabled:opacity-50"
          >
            <Save size={18} /> {loading ? "Creating..." : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
}
