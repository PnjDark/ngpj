import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project }) {
  return (
    <div className="group border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition duration-300">
      <div className="relative h-64 bg-neutral-800">
        {project.mediaAssets && project.mediaAssets[0] ? (
          <Image
            src={project.mediaAssets[0]}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-neutral-500">
            No image available
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className="text-xs uppercase tracking-widest text-neutral-500 font-bold px-3 py-1 bg-neutral-900 border border-neutral-800 rounded-full">
            {project.category}
          </span>
          <div className="flex gap-2">
            {project.techStack?.slice(0, 3).map((tech, index) => (
              <span key={index} className="text-[10px] text-neutral-400">
                {tech}
              </span>
            ))}
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-neutral-200 transition">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>
        <Link
          href={`/projects/${project.id}`}
          className="inline-flex items-center text-sm font-semibold hover:gap-2 transition-all duration-300"
        >
          View Case Study <span className="ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
