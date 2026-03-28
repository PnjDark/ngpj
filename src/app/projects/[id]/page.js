"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getProject } from "@/services/projects";
import { getCaseStudyByProject } from "@/services/caseStudies";
import CaseStudyView from "@/components/portfolio/CaseStudyView";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectData = await getProject(id);
        if (projectData) {
          setProject(projectData);
          const caseStudyData = await getCaseStudyByProject(id);
          setCaseStudy(caseStudyData);
        }
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Loading...</div>;
  if (!project) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Project not found.</div>;

  return (
    <div className="min-h-screen bg-neutral-900 text-white pb-24">
      <div className="relative h-[60vh] w-full">
        {project.mediaAssets && project.mediaAssets[0] ? (
          <Image
            src={project.mediaAssets[0]}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-neutral-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12 container mx-auto">
          <span className="text-sm uppercase tracking-widest text-neutral-400 font-bold mb-4 block">
            {project.category}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <span key={index} className="px-3 py-1 bg-white/10 rounded-full text-xs backdrop-blur-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">About the Project</h2>
            <p className="text-xl text-neutral-300 leading-relaxed mb-12">
              {project.description}
            </p>

            {caseStudy ? (
              <CaseStudyView caseStudy={caseStudy} />
            ) : (
              <div className="p-8 border border-neutral-800 rounded-2xl bg-neutral-800/30">
                <p className="text-neutral-500 italic">No detailed case study available for this project yet.</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              <div className="p-6 border border-neutral-800 rounded-2xl bg-neutral-800/30">
                <h3 className="text-lg font-bold mb-4">Project Details</h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-neutral-500 text-sm">Role</dt>
                    <dd>{project.category}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500 text-sm">Status</dt>
                    <dd>{project.status}</dd>
                  </div>
                  <div>
                    <dt className="text-neutral-500 text-sm">Skills Used</dt>
                    <dd className="flex flex-wrap gap-1 mt-2">
                      {project.tags?.map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-neutral-800 rounded text-[10px]">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
