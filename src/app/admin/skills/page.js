"use client";

import { useEffect, useState } from "react";
import { getSkills, createSkill, updateSkill, deleteSkill } from "@/services/skills";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSkill, setEditingSkill] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: "", category: "Developer" });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const fetchedSkills = await getSkills();
    setSkills(fetchedSkills);
    setLoading(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (editingSkill) {
      await updateSkill(editingSkill.id, formData);
    } else {
      await createSkill(formData);
    }
    setEditingSkill(null);
    setIsAdding(false);
    setFormData({ name: "", category: "Developer" });
    fetchSkills();
  };

  const startEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({ name: skill.name, category: skill.category });
    setIsAdding(true);
  };

  const cancelEdit = () => {
    setEditingSkill(null);
    setIsAdding(false);
    setFormData({ name: "", category: "Developer" });
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this skill?")) {
      await deleteSkill(id);
      fetchSkills();
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Skills</h1>
          <p className="text-neutral-500">Define and organize your technical and creative skills.</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
          >
            <Plus size={18} /> Add Skill
          </button>
        )}
      </header>

      {isAdding && (
        <form onSubmit={handleSave} className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900 shadow-xl flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase">Skill Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/10"
              required
              placeholder="e.g., React"
            />
          </div>
          <div className="w-48">
            <label className="block text-xs font-semibold mb-2 text-neutral-500 uppercase">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/10"
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Artist">Artist</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="p-2.5 bg-white text-black rounded-lg hover:bg-neutral-200 transition"
            >
              <Save size={20} />
            </button>
            <button
              type="button"
              onClick={cancelEdit}
              className="p-2.5 bg-neutral-800 text-neutral-400 rounded-lg hover:bg-neutral-700 transition"
            >
              <X size={20} />
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="p-4 border border-neutral-800 rounded-xl bg-neutral-900/50 flex justify-between items-center group">
            <div>
              <span className="block font-bold text-white">{skill.name}</span>
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest">{skill.category}</span>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition duration-300">
              <button onClick={() => startEdit(skill)} className="p-2 text-neutral-400 hover:text-white transition">
                <Edit size={16} />
              </button>
              <button onClick={() => handleDelete(skill.id)} className="p-2 text-neutral-400 hover:text-red-500 transition">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-neutral-500 col-span-full text-center py-12">No skills added yet.</p>
        )}
      </div>
    </div>
  );
}
