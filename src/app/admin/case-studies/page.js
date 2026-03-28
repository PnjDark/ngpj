"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/services/projects";
import { getCaseStudies, deleteCaseStudy } from "@/services/caseStudies";
import { Plus, Edit, Trash2, FileText } from "lucide-react";

export default function AdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [projects, setProjects] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [fetchedCS, fetchedProjects] = await Promise.all([
      getCaseStudies(),
      getProjects(false)
    ]);

    const projectsMap = fetchedProjects.reduce((acc, p) => ({ ...acc, [p.id]: p.title }), {});
    setProjects(projectsMap);
    setCaseStudies(fetchedCS);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this case study?")) {
      await deleteCaseStudy(id);
      fetchData();
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold mb-2">Case Studies</h1>
          <p className="text-neutral-500">Manage detailed storytelling for your projects.</p>
        </div>
        <Link
          href="/admin/case-studies/new"
          className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-neutral-200 transition"
        >
          <Plus size={18} /> New Case Study
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caseStudies.map((cs) => (
          <div key={cs.id} className="p-6 border border-neutral-800 rounded-2xl bg-neutral-900 group relative">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-neutral-800 rounded-xl text-neutral-400 group-hover:text-white transition">
                <FileText size={24} />
              </div>
              <div className="flex gap-1">
                <Link href={`/admin/case-studies/edit/${cs.id}`} className="p-2 text-neutral-400 hover:text-white transition">
                  <Edit size={18} />
                </Link>
                <button onClick={() => handleDelete(cs.id)} className="p-2 text-neutral-400 hover:text-red-500 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">
              {projects[cs.projectId] || "Unknown Project"}
            </h3>
            <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
              {cs.problem}
            </p>
            <div className="text-[10px] text-neutral-600 font-mono uppercase">CS_ID: {cs.id}</div>
          </div>
        ))}
        {caseStudies.length === 0 && (
          <p className="text-neutral-500 col-span-full text-center py-12 italic border border-dashed border-neutral-800 rounded-2xl">
            No case studies found. Start documenting your process!
          </p>
        )}
      </div>
    </div>
  );
}
