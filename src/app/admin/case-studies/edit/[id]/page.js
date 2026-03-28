"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProjects } from "@/services/projects";
import { getCaseStudy, updateCaseStudy } from "@/services/caseStudies";
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditCaseStudy() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    projectId: "",
    problem: "",
    approach: "",
    process: "",
    outcome: "",
    richContent: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedProjects, cs] = await Promise.all([
        getProjects(false),
        getCaseStudy(id)
      ]);
      setProjects(fetchedProjects);
      if (cs) {
        setFormData({
          projectId: cs.projectId || "",
          problem: cs.problem || "",
          approach: cs.approach || "",
          process: cs.process || "",
          outcome: cs.outcome || "",
          richContent: cs.richContent || []
        });
      }
      setLoading(false);
    };
    if (id) fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRichContent = (type) => {
    setFormData(prev => ({
      ...prev,
      richContent: [...prev.richContent, { type, url: "", text: "" }]
    }));
  };

  const removeRichContent = (index) => {
    setFormData(prev => ({
      ...prev,
      richContent: prev.richContent.filter((_, i) => i !== index)
    }));
  };

  const updateRichContent = (index, field, value) => {
    const newContent = [...formData.richContent];
    newContent[index][field] = value;
    setFormData({ ...formData, richContent: newContent });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateCaseStudy(id, formData);
      router.push("/admin/case-studies");
    } catch (error) {
      console.error("Error updating case study:", error);
      alert("Failed to update case study.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading data...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <header className="flex items-center gap-4">
        <Link href="/admin/case-studies" className="p-2 hover:bg-neutral-800 rounded-lg transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-4xl font-bold">Edit Case Study</h1>
          <p className="text-neutral-500">Update the documentation for your project.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8 bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-xl">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase">Linked Project</label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            >
              <option value="">Select a project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-widest">The Problem</label>
            <textarea
              name="problem"
              value={formData.problem}
              onChange={handleChange}
              rows="4"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-widest">The Approach</label>
            <textarea
              name="approach"
              value={formData.approach}
              onChange={handleChange}
              rows="4"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-widest">The Process</label>
            <textarea
              name="process"
              value={formData.process}
              onChange={handleChange}
              rows="4"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-neutral-400 uppercase tracking-widest">The Outcome</label>
            <textarea
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              rows="4"
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
            ></textarea>
          </div>

          <div className="pt-8 border-t border-neutral-800">
            <h3 className="text-xl font-bold mb-6">Gallery & Rich Content</h3>
            <div className="space-y-4">
              {formData.richContent.map((content, index) => (
                <div key={index} className="p-4 bg-neutral-800 rounded-xl flex gap-4 items-start">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">{content.type}</span>
                      <button type="button" onClick={() => removeRichContent(index)} className="text-red-500 hover:text-red-400"><Trash2 size={16}/></button>
                    </div>
                    {content.type !== 'text' && (
                      <input
                        type="text"
                        value={content.url}
                        onChange={(e) => updateRichContent(index, 'url', e.target.value)}
                        placeholder="URL (image/video)"
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2"
                      />
                    )}
                    <textarea
                      value={content.text}
                      onChange={(e) => updateRichContent(index, 'text', e.target.value)}
                      placeholder="Caption or description"
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2"
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              ))}
              <div className="flex gap-4">
                <button type="button" onClick={() => addRichContent('image')} className="flex-1 py-3 border border-dashed border-neutral-700 rounded-xl hover:bg-neutral-800 transition flex items-center justify-center gap-2"><Plus size={16}/> Add Image</button>
                <button type="button" onClick={() => addRichContent('video')} className="flex-1 py-3 border border-dashed border-neutral-700 rounded-xl hover:bg-neutral-800 transition flex items-center justify-center gap-2"><Plus size={16}/> Add Video</button>
                <button type="button" onClick={() => addRichContent('text')} className="flex-1 py-3 border border-dashed border-neutral-700 rounded-xl hover:bg-neutral-800 transition flex items-center justify-center gap-2"><Plus size={16}/> Add Text</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition disabled:opacity-50"
          >
            <Save size={18} /> {saving ? "Saving..." : "Update Case Study"}
          </button>
        </div>
      </form>
    </div>
  );
}
